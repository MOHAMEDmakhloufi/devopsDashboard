pipeline {
    agent any
    stages {
        stage("Sonarqube analysis ") {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh "npm install"
                    withSonarQubeEnv(installationName:'sonarQube'){
                        sh "npm install sonar-scanner"
                        sh "npm run sonar"
                    }
                }
            }
        }
        
      

    }
}
