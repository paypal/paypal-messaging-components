pipeline {
    agent {
        label 'mesos'
    }
    tools {
        nodejs 'Node12'
    }
    environment {
        GIT_COMMIT_MESSAGE = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
        STAGE_TAG=sh(returnStdout: true, script: 'echo $channel_$(date +%s)').trim()
    }

    stages {
        withCredentials([usernamePassword(credentialsId: 'web-cli-creds', passwordVariable: 'SVC_ACC_PASSWORD', usernameVariable: 'SVC_ACC_USERNAME')]) {
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
                    sh 'npm run build -- -t $STAGE_TAG'
                }
            }

            stage('Deploy') {
                when { 
                    branch 'release'
                }
                steps {
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
                        value: "$branch",
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
                ],
            )
        }
    }
}