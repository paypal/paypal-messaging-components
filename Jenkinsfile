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
                        npm run build -- -t develop_$(date +%s)
                        OUTPUT=$(web stage --json)
                        BUNDLE_ID=$(node -e 'console.log(JSON.parse(process.argv[1]).id)' "$OUTPUT")
                    '''
                }
            }
        }
    }
}