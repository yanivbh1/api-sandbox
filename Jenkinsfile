def dockerHubRepo = "nsci-image-repo"
def imageName = "custom-api-sandbox"
def gitURL = "https://github.com/YanivBenHemo-NSCI/api-sandbox.git"
def gitBranch = "main"
unique_Id = UUID.randomUUID().toString()

node {
  try{
    stage('SCM checkout') {
        git credentialsId: '03ad6238-4e8e-410e-9e4f-2c41b2a23997', url: gitURL, branch: gitBranch
    }
    stage('Build docker image') {
        sh "docker build -t registry.digitalocean.com/${dockerHubRepo}/${imageName} ."
    }

    stage('Push docker image') {
        sh "docker tag registry.digitalocean.com/${dockerHubRepo}/${imageName} registry.digitalocean.com/${dockerHubRepo}/${imageName}:${unique_Id}"
        sh "docker push registry.digitalocean.com/${dockerHubRepo}/${imageName}:${unique_Id}"
        sh "docker push registry.digitalocean.com/${dockerHubRepo}/${imageName}:latest"
    }
    
    stage('Push image to kubernetes') {
	sh "kubectl --kubeconfig=\"/var/lib/jenkins/.kube/nsci-k8s-staging-kubeconfig.yaml\" apply -f \"k8s-template.yaml\" --record"
	sh "kubectl --kubeconfig=\"/var/lib/jenkins/.kube/nsci-k8s-staging-kubeconfig.yaml\" set image deployment/${imageName}-deployment ${imageName}=registry.digitalocean.com/${dockerHubRepo}/${imageName}:${unique_Id} -n nsci-engine"
    }
    notifySuccessful()

  } catch (e) {
      currentBuild.result = "FAILED"
      notifyFailed()
      throw e
  }
}

def notifySuccessful() {
  emailext (
      subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}

def notifyFailed() {
  emailext (
      subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}
