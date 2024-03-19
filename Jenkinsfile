pipeline {
    agent {
        label 'mesos'
    }

    tools {
        nodejs 'Node18'
    }

    environment {
        BRANCH_NAME = sh(returnStdout: true, script: 'echo $GIT_BRANCH | sed "s#origin/##g"').trim()
        GIT_COMMIT_MESSAGE = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
        GIT_COMMIT_HASH = GIT_COMMIT.take(7)
    }

    stages {
        stage('Setup') {
            steps {
                checkout scm
                sh '''
                    echo $GIT_COMMIT_MESSAGE
                    node -v
                    npm -v
                    npm i --reg $REGISTRY -g @paypalcorp/web
                '''
            }
        }

        // For release, deploy existing build assets
        stage('Bundle Stage') {
            steps {
                script {
                    if (GIT_COMMIT_MESSAGE.contains('chore(release)')) {
                        // include only version number section of commit message
                        env.VERSION=GIT_COMMIT_MESSAGE.substring(GIT_COMMIT_MESSAGE.indexOf(':') + 1, GIT_COMMIT_MESSAGE.indexOf('['))
                        // Stage tags can only contain alphnumeric characters and underscores
                        env.VERSION=VERSION.replace('.', '_').trim();
                        env.stageBundleId='up_stage_v' + VERSION + '_' + GIT_COMMIT_HASH
                        withCredentials([usernamePassword(credentialsId: 'web-cli-creds', passwordVariable: 'SVC_ACC_PASSWORD', usernameVariable: 'SVC_ACC_USERNAME')]) {
                           sh '''
                                rm -rf ./dist/bizcomponents/sandbox
                                rm -rf ./dist/bizcomponents/js
                                output=$(web stage --tag $stageBundleId)
                                web notify "$stageBundleId"
                                git checkout -- dist
                           '''
                        }
                    }
                }
            }
        }
        stage('Bundle Sandbox') {
            steps {
                script {
                    if (GIT_COMMIT_MESSAGE.contains('chore(release)')) {
                        env.sandboxBundleId='up_sb_v' + VERSION + '_' + GIT_COMMIT_HASH
                        withCredentials([usernamePassword(credentialsId: 'web-cli-creds', passwordVariable: 'SVC_ACC_PASSWORD', usernameVariable: 'SVC_ACC_USERNAME')]) {
                           sh '''
                                rm -rf ./dist/bizcomponents/stage
                                rm -rf ./dist/bizcomponents/js
                                output=$(web stage --tag $sandboxBundleId)
                                web notify "$sandboxBundleId"
                                git checkout -- dist
                           '''
                        }
                    }
                }
            }
        }
        stage('Build Production') {
            steps {
                script {
                    if (GIT_COMMIT_MESSAGE.contains('chore(release)')) {
                        env.productionBundleId='up_prod_v' + VERSION + '_' + GIT_COMMIT_HASH
                        withCredentials([usernamePassword(credentialsId: 'web-cli-creds', passwordVariable: 'SVC_ACC_PASSWORD', usernameVariable: 'SVC_ACC_USERNAME')]) {
                           sh '''
                                rm -rf ./dist/bizcomponents/stage
                                rm -rf ./dist/bizcomponents/sandbox
                                output=$(web stage --tag $productionBundleId)
                                web notify "$productionBundleId"
                                git checkout -- dist
                           '''
                        }
                    }
                }
            }
        }
    }

    // Send email notification
    post {
        success {
            emailext(
                mimeType: 'text/html',
                // Single quotes on this so the variable makes it to the email plugin instead of Jenkins trying to replace
                to: '$DEFAULT_RECIPIENTS',
                subject: "paypal-messaging-components - ${BRANCH_NAME} - Build #${env.BUILD_NUMBER} - SUCCESS!",
                body: """
                    Build Succeeded!<br />
                    <br />
                    ${GIT_COMMIT_MESSAGE}<br />
                    Build URL: ${BUILD_URL}<br />
                    <br />
                    Version ${env.VERSION} assets have been bundled and are ready for review.<br />
                    Please approve and deploy: <br />
                    1. Stage: ${BUNDLE_URL}${stageBundleId} <br />
                    2. Sandbox: ${BUNDLE_URL}${sandboxBundleId} <br />
                    3. Production: ${BUNDLE_URL}${productionBundleId} <br />
                    <br />
                    Regards,<br />
                    Your friendly neighborhood digital butler
                """
            )
        }
    }
}
