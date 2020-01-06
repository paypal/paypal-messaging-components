pipeline {
    agent {
        label 'mesos'
    }
    tools {
        nodejs 'Node10'
    }
    environment {
        GIT_BRANCH = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
        GIT_COMMIT_MESSAGE = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
    }

    stages {
        stage('Publish') {
            when {
                expression {
                    return env.GIT_COMMIT_MESSAGE ==~ /^(chore\(release\):.+)/
                }
            }
            steps {
                checkout scm
                sh '''
                    echo "GIT_BRANCH: $GIT_BRANCH"
                    node -v
                    npm -v
                    npm set registry https://npm.paypal.com
                    npm i -g web
                '''
                withCredentials([usernamePassword(credentialsId: 'web-cli-creds', passwordVariable: 'SVC_ACC_PASSWORD', usernameVariable: 'SVC_ACC_USERNAME')]) {
                    sh '''
                        BUNDLE_ID=$(web stage | grep ID | sed -E 's/.+ID ([0-9a-z]+)/\1/')
                        web notify $BUNDLE_ID
                    '''
                }
            }
        }
    }
}