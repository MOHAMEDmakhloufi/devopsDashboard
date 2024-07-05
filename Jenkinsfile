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
              
              echo "hello sonar" 
            }
        }
        stage("Selenium Tests") {
              steps {
                script {
                    
                  sh 'python3 -m venv myenv'
                  sh 'source myenv/bin/activate'
                  sh 'pip install webdriver-manager'
                  sh 'rm -rf myenv'
                }
              }
          }
        
      

    }
}
