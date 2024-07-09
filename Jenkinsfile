pipeline {
    agent any
    parameters {
      booleanParam(name: 'DeployToProd', defaultValue: false, description : 'Do you want to deploy this app to production?')
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
                  
                  sh "docker build -t devops_dashboard:latest ."
                }
              }
          }
      stage("Deploy To Pre-Prod") {
              steps {
                script {
                  sh "docker run -d --name devops_dashboard --network dashboard_network -p 4200:8080 devops_dashboard:latest"
                }
              }
          }
        stage("Selenium Tests") {
              steps {
                script {
                  sh "docker run --network dashboard_network --rm -v ${WORKSPACE}/integration_tests:/usr/app selenium-test python /usr/app/seleniumTest.py chrome"
                }
              }
          }
        stage("Deploy To Prod") {
                when {
                  expression {
                    params.DeployToProd == true
                  }
                }
              steps {
                script {
                  echo "hello Deploy to Prod"
                }
              }
          }

        stage("Cleaning Up ...") {
                
              steps {
                script {
                  sh "docker rmi devops_dashboard:latest"
                  sh "docker stop devops_dashboard"
                  sh "docker rm devops_dashboard"
                }
              }
          }
      

    }
}
