pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID = credentials('jenkins_aws_access_key_id')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins_aws_secret_access_key')
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
                //Deploy to S3
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