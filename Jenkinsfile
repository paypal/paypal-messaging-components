STAGE_TAG = ""

pipeline {
    agent {
        label 'mesos'
    }
    tools {
        nodejs 'Node12'
    }
    environment {
        GIT_BRANCH = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
        GIT_COMMIT_MESSAGE = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
    }

    stages {
        stage('Stage Tag') {
            steps {
                checkout scm
                sh '''
                    echo "GIT_BRANCH: $GIT_BRANCH"
                    node -v
                    npm -v
                    npm set registry https://npm.paypal.com
                    npm i -g @paypalcorp/web
                '''
                withCredentials([usernamePassword(credentialsId: 'web-cli-creds', passwordVariable: 'SVC_ACC_PASSWORD', usernameVariable: 'SVC_ACC_USERNAME')]) {
                    sh '''
                        STAGE_TAG=develop_$(date +%s)
                        npm run build -- -t $STAGE_TAG

                        echo "$STAGE_TAG" > .env
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
                        value: "$GIT_BRANCH",
                    ],
                    [
                        $class: 'StringParameterValue',
                        name: 'stageTag',
                        value: "$STAGE_TAG",
                    ]
                ],
            )
        }
    }
}