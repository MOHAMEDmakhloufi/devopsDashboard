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
                  sh '. myenv/bin/activate'
                  sh 'myenv/bin/pip install webdriver-manager selenium'
                  sh 'myenv/bin/python test.py'
                  sh 'rm -rf myenv'
                }
              }
          }
        
      

    }
}
