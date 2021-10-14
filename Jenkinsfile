pipeline {
    agent {
        label 'mesos'
    }
    tools {
        nodejs 'Node12'
    }
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
            }
        }

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

    post {
        always {
            build(
                job: 'notifications',
                wait: false,
                parameters: [
                    [
                        $class: 'StringParameterValue',
                        name: 'channel',
                        value: "$BRANCH_NAME",
                    ],
                    [
                        $class: 'StringParameterValue',
                        name: 'stageTag',
                        value: "$STAGE_TAG",
                    ],
                    [
                        $class: 'StringParameterValue',
                        name: 'gitCommit',
                        value: "$GIT_COMMIT_MESSAGE",
                    ],
                    
                    [
                        $class: 'StringParameterValue',
                        name: 'buildStatus',
                        value: currentBuild.result
                    ],
                    [
                        $class: 'StringParameterValue',
                        name: 'buildNumber',
                        value: "${env.BUILD_NUMBER}",
                    ],
                    [
                        $class: 'StringParameterValue',
                        name: 'buildNumber',
                        value: "${env.BUILD_NUMBER}",
                    ],
                    [
                        $class: 'StringParameterValue',
                        name: 'buildUrl',
                        value: "${env.BUILD_URL}",
                    ],
                ],
            )
        }
    }
}