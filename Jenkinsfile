pipeline {
    agent any
    parameters {
      booleanParam(name: 'deployToProd", defaultValue: false, description : 'Do you want to deploy this app to production')
    }
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
        stage("Build Docker Image") {
              steps {
                script {
                  echo "hello Docker"
                }
              }
          }
      stage("Deploy To Pre-Prod") {
              steps {
                script {
                  echo "hello Pre-Prod"
                }
              }
          }
        stage("Selenium Tests") {
              steps {
                script {
                  echo "hello selenium"
                }
              }
          }
        stage("Deploy To Prod") {
              steps {
                when {
                  expression {
                    params.deployToProd == true
                  }
                }
                script {
                  echo "hello Prod"
                }
              }
          }
      

    }
}
