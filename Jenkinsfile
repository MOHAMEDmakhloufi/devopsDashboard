pipeline {
    agent any
    stages {
        stage("Sonarqube analysis ") {
            steps {
              /*
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh "npm install"
                    withSonarQubeEnv(installationName:'sonarQube'){
                        sh "npm run sonar"
                    }
                    
                }
              */
              sh 'sleep 10'
              echo "hello sonar" 
            }
        }
        stage("Selenium Tests") {
              steps {
                sh 'python3 --version'
              }
          }
        
      

    }
}
