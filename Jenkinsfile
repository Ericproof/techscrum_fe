pipeline {
    agent any
    environment {
        //  Node.js version
        NODE_VERSION = '16.11.33' 
    }
    stages {
        // stage('Setup Node.js') {
        //     steps {
        //         // install Node.js
        //         script {
        //             def node = tool name: "NodeJS ${env.NODE_VERSION}", type: 'NodeJSInstallation'
        //             env.PATH = "${node}/bin:${env.PATH}"
        //         }
        //     }
        // }
        stage('Install Dependencies') {
            steps {
                // npm install package
                sh 'yarn cache clean'
                sh 'yarn install'
            }
        }
        stage('Build') {
            steps {
                // yarn build
                sh 'yarn run build'
            }
        }
        // stage('Archive Artifacts') {
        //     steps {

        //         archiveArtifacts artifacts: 'build/**'
        //     }
        // }
        stage('Deploy') {
            steps {

                sh 'aws s3 sync build/ s3://eric-devops-techscrum-bucket/ --delete'
            }
        }
    }

    post {
        always {
            // clean up
            cleanWs()
        }
    }
}