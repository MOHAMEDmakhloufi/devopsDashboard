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
                script {
                    // Define the path to your virtual environment's Python interpreter
                    def pythonHome = "myenv/bin/python"
                    
                    // Run your Selenium tests using the virtual environment's Python
                    sh "${pythonHome} seleniumTest.py"
                }
              }
          }
        
      

    }
}
