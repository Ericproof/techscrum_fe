pipeline {
    agent any

    environment {
        // 定义 Node.js 版本（根据需要调整）
        NODE_VERSION = '16.11.33' 
    }
        stage('Setup Node.js') {
            steps {
                // install Node.js
                script {
                    def node = tool name: "NodeJS ${env.NODE_VERSION}", type: 'NodeJSInstallation'
                    env.PATH = "${node}/bin:${env.PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // npm install package
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // npm build
                sh 'npm run build'
            }
        }

        stage('Archive Artifacts') {
            steps {
                // 存档构建产物
                archiveArtifacts artifacts: 'build/**'
            }
        }

        stage('Deploy') {
            steps {
                // 部署到服务器或其他目标（根据实际需求修改）
                // 示例：将构建的文件推送到 S3
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