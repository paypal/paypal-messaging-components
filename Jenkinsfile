pipeline {
    agent {
        label 'mesos'
    }
    
    tools {
        nodejs 'Node12'
    }

    // STAGE_TAG will be {branch_name}_{timestamp}
    environment {
        BRANCH_NAME = sh(returnStdout: true, script: 'echo $GIT_BRANCH | sed "s#origin/##g"').trim()
        GIT_COMMIT_MESSAGE = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
        STAGE_TAG = sh(returnStdout: true, script: 'echo $(echo $GIT_BRANCH | sed "s#origin/##g" | sed "s/-/_/g")_$(date +%s)').trim()
    }

    stages {
        stage('Setup') {
            steps {
                checkout scm
                sh '''
                    echo $GIT_COMMIT_MESSAGE
                    node -v
                    npm -v
                    npm set registry https://npm.paypal.com
                    npm i -g @paypalcorp/web
                '''
            }
        }

        // For non-release, auto-generate a stage build
        stage('Stage Tag') {
            when { 
                not {
                    branch 'release'
                }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'web-cli-creds', passwordVariable: 'SVC_ACC_PASSWORD', usernameVariable: 'SVC_ACC_USERNAME')]) {
                    sh 'npm run build -- -t $STAGE_TAG'
                }
                sh '''
                    # create a file with some info to be included in the email notification
                    echo "
                        ${GIT_COMMIT_MESSAGE}<br />
                        Build URL: ${env.BUILD_URL}<br />
                        Stage Tag: ${STAGE_TAG}<br />
                        Test Page: ${TEST_URL}${STAGE_TAG}
                    " > output
                '''
            }
        }

        // For release, stage existing build assets and send notification
        stage('Deploy') {
            when { 
                branch 'release'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'web-cli-creds', passwordVariable: 'SVC_ACC_PASSWORD', usernameVariable: 'SVC_ACC_USERNAME')]) {
                    sh '''
                        OUTPUT=$(web stage --json --tag $STAGE_TAG)
                        web notify $STAGE_TAG
                    '''
                }
            }
        }
    }

    // Send email notification
    post {
        success {
            emailext(
                recipientProviders: ['recipients'],
                subject: 'paypal-messaging-components - ${BRANCH_NAME} - Build #${env.BUILD_NUMBER} - SUCCESS!',
                body: '''
                    Build Succeeded!<br />
                    <br />
                    ${FILE,path="output"}<br />
                    <br />
                    Regards,<br />
                    Your friendly neighborhood digital butler
                '''
            )
        }
    }
}
