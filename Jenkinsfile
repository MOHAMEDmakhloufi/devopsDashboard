pipeline {
    agent any
    parameters {
        booleanParam(name: 'DeployToProd', defaultValue: false, description: 'Do you want to deploy this app to production?')
    }
    stages {
        stage("Sonarqube analysis") {
            steps {
                
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh "npm install"
                    withSonarQubeEnv(installationName:'sonarQube'){
                        sh "npm run sonar"
                    }
                }
                
                //echo "hello sonar"
            }
        }
        stage("Build Docker Image") {
            steps {
                script {
                    sh "docker build -t devops_dashboard ."
                }
            }
        }
        stage("Deploy To Pre-Prod") {
            steps {
                script {
                    sh "docker run -d --name devops_dashboard --network dashboard_network -p 8081:8080 devops_dashboard"
                }
            }
        }
        stage("Selenium Tests") {
            steps {
                script {
                    sh "docker run --network dashboard_network --rm -d --name selenium-test-container selenium-test sleep infinity"
                    sh "docker cp ${WORKSPACE}/integration_tests/seleniumTest.py selenium-test-container:/usr/app/seleniumTest.py"
                    sh "docker exec selenium-test-container python /usr/app/seleniumTest.py chrome"
                    
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
    }
    post {
        always {
            echo 'Cleaning up...'
            script {
              sh "docker stop selenium-test-container"
              sh "docker stop devops_dashboard"
              sh "docker rm devops_dashboard"
              //sh "docker rmi devops_dashboard:latest"
                
            }
        }
    }
}
