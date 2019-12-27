pipeline {
  agent {
    label 'mesos'
  }
  tools {
    nodejs 'Node10'
  }

  stages {
    stage('Initialization') {
      steps {
        checkout scm
        sh '''
          echo "BRANCH_NAME: $BRANCH_NAME"
          node -v
          npm -v
          npm set registry https://npm.paypal.com
        '''
      }
    }
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    // stage('Stage') {
    //   steps {
    //     withCredentials([usernamePassword(credentialsId: 'web-cli-creds', passwordVariable: 'SVC_ACC_PASSWORD', usernameVariable: 'SVC_ACC_USERNAME')]) {
    //       sh 'npm run stage'
    //     }
    //   }
    // }
  }
}