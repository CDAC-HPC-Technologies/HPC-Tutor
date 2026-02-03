---
title: E4S Hands-On Lab
slug: e4s_hands_on_lab
url: /en/e4s-hands-on-lab/
order: 6
---

# E4S Hands-On Lab

### **Introduction**

Using existing high-quality libraries and tools can greatly boost productivity. However, as HPC and AI/ML software grow more complex, installing, maintaining, and optimizing integrated software stacks becomes increasingly challenging.

The **Extreme-Scale Scientific Software Stack (E4S)** project addresses this by providing a modular, interoperable ecosystem of numerical libraries, runtime systems, and tools. E4S leverages the Spack package manager to deliver source builds for native installations and containerized deployments, enabling secure, reproducible, and portable HPC software stacks. Its goal is to simplify the development, deployment, and use of HPC and AI/ML applications.

### **Motivation**

HPC and AI/ML applications rely on complex software stacks with deep dependencies, making installation and maintenance difficult. Different platforms, evolving APIs, and conflicting library versions often require system teams to dedicate significant resources just to maintain software environments. This complexity hampers portability, reproducibility, and efficiency in scientific computing, even for the original authors of research results. E4S aims to solve these challenges by providing a consistent, deployable software ecosystem.

### **Scope of the Lab**

This hands-on lab focuses on the **practical use of E4S in real HPC environments**. Participants will interact with E4S through containerized deployments and selected software components to understand how E4S simplifies software usage on modern supercomputing systems.

The lab emphasizes **user-level workflows** rather than system-level administration, making it suitable for a broad audience, including researchers, students, and developers.

### **Why E4S?**

Modern HPC and AI/ML applications depend on complex software stacks with deep and evolving dependencies. Managing these stacks across diverse systems often leads to compatibility issues, inconsistent environments, and reduced productivity.

The **Extreme-scale Scientific Software Stack (E4S)** addresses these challenges by providing a curated, interoperable collection of production-quality HPC libraries and tools. Built on top of **Spack**, E4S enables portable, reproducible, and high-performance software environments for leadership-class computing systems.

Key benefits of E4S include:

* **Eliminates software compatibility issues** across platforms
* **Performance portability** across CPUs and GPUs
* **Reproducible scientific workflows** using containers and Spack
* **Vendor-neutral and open-source** ecosystem
* **Production-ready** for leadership-class HPC systems

---

### **Lab Objectives**

By the end of this lab, you will be able to:

* Run E4S CPU and GPU containers
* Explore the E4S software stack
* Compile and execute Kokkos applications
* Run MPI jobs inside containers using Slurm
* Use E4S effectively on real HPC systems

### **Lab Environment**

**Prerequisites**

* Linux-based HPC system
* Slurm workload manager
* Apptainer / Singularity
* No root access required

**E4S Assets Used**

* E4S CPU container
* E4S CUDA (GPU) container

### 

### **Lab Roadmap**

1. Environment check
2. Run E4S CPU container
3. Explore E4S software stack
4. MPI inside E4S
5. Host bindings
6. GPU-enabled E4S (optional)

### 

### **Lab 0 – Environment Check**

Before starting, verify that the HPC environment is properly configured.

**Checks Performed**

* Login node access
* Slurm availability
* Apptainer/Singularity installation

**Key Commands:**

```
# Display the system hostname
hostname
```

```
# Show CPU architecture details
lscpu | head
```

```
# Check whether Apptainer or Singularity is available
which apptainer || which singularity
```

```
# Verify Slurm version
srun --version
```

### **Lab 1 – Running the E4S CPU Container**

In this lab, you will start an interactive E4S CPU container and bind a scratch directory for data access.

**Outcome**

* Fully configured HPC software stack
* Isolated and reproducible environment

**step1 : Load Spack and Apptainer Environment**

First, initialize the Spack environment and load Apptainer (if provided via Spack on your system):

```
source /path/to/spack/share/spack/setup-env.sh 
spack load apptainer@1.4.1
```

**Explanation:**  
This step initializes Spack in the current shell and loads the Apptainer runtime so that container commands are available.

---

**step2: Download an E4S CPU-Only Container**

Use the official E4S container download page to select a **CPU-only container** that matches your operating system:

👉 **Container download page:**  
<https://e4s.io/container-download/>

For this lab, a CPU-only container based on **Rocky Linux** was selected:

👉**CPU****-only container (Rocky Linux):**  
<https://oaciss.nic.uoregon.edu/e4s/images/25.11/e4s-cpu-rocky9.6-x86_64-25.11.sif>

Download the required `.sif` image appropriate for your system.

---

**step3: Start the Container with Required Bind Mounts**

Launch an interactive shell inside the container and bind required host directories:

```
singularity shell -B/path/to/spack:/path/to/spack -B/scratch:/scratch/e4s-cpu-rocky9.6-x86_64-25.11.sif
```

**Explanation:**

* The Spack directory is bind-mounted so host-installed compilers and MPI can be reused.
* The scratch directory is mounted for temporary data and job outputs.

---

**step4: Configure Environment Inside the Container**

Once inside the Singularity/Apptainer shell, initialize Spack again:

```
source /path/to/spack/share/spack/setup-env.sh
```

Verify Spack is available:

```
spack --version
```

Check the MPI compiler being used:

```
which mpicc
```

**Explanation:**  
This confirms that the container is correctly using the **host Spack environment**, ensuring consistent MPI and compiler behavior.

### **Lab 2 – Exploring the E4S Stack**

* Spack inside container
* Discover installed packages
* Load compilers and libraries

**Key Tools:** gcc, MPI, Kokkos

**Commands:**

```
spack find | head
spack find kokkos
spack find mpi
```

**Load Tools:**

```
spack load gcc
spack load kokkos
```

**Check:**

```
which kokkos_cxx
kokkos_cxx --version
```

### **Lab 3 – MPI Inside E4S**

* Use host Slurm launcher
* Run MPI applications in container
* Scale across ranks

**Best Practice** - Host MPI + Containerized application  
  
**Command:**spack load openmpi  
**Create Code :**

**Create Code:**

```
cat > mpi_hello.c <<eof 
#include <stdio.h>

int main(int argc, char** argv) {
  MPI_Init(&argc, &argv);
  int rank, size;
  MPI_Comm_rank(MPI_COMM_WORLD, &rank);
  MPI_Comm_size(MPI_COMM_WORLD, &size);
  printf("Hello from rank %d of %d\n", rank, size);
  MPI_Finalize();
}
EOF

Compile: mpicc mpi_hello.c -o mpi_hello  

Run with Slurm: srun -n 4 apptainer exec e4s-cpu-rocky9.6-x86_64-25.11.sif ./mpi_hello
```

### **Lab 4 – Binding Host Resources**

* Bind scratch and host software paths
* Share data between host & container

**Use Cases** - Access host Spack installs - Read/write large datasets

**Command:**

```
apptainer shell \  

  -B /scratch:/scratch \  

  -B /home/apps/SPACK:/host_spack \  

  e4s-cpu-rocky9.6-x86_64-25.11.sif
```

**Inside container:**ls /host\_spack

### **Lab 5 – GPU E4S (Optional)**

**step 1 : Request a GPU Node (Slurm)**

Start an interactive job on a GPU partition:

```
srun --gres=gpu:1 --time=00:20:00 --mem=100mb -p gpu --pty bash
```

**Explanation:**  
This command requests one GPU, limited runtime, and memory, and provides an interactive shell on a GPU compute node.

---

**Step2 : Load Spack and Apptainer Environment**

Initialize the Spack environment and load Apptainer:

```
source /path/to/spack/share/spack/setup-env.sh 
spack load apptainer
```

**Explanation:**  
Spack initializes the software environment and makes the Apptainer/Singularity runtime available for container execution.

---

**Step3:  Download an E4S GPU Container**

Use the official E4S container download page to select a **GPU-enabled container** compatible with your system:

👉 **Container download page:**  
<https://e4s.io/container-download/>

For this lab, a CUDA-enabled Rocky Linux container was used:

👉 **CUDA GPU-only container (Rocky Linux):**  
<https://oaciss.nic.uoregon.edu/e4s/images/25.11/e4s-cuda90-rocky9.6-x86_64-25.11.sif>

Download the `.sif` image before launching the container.

---

**Step 4: Launch the GPU Container**

Start an interactive shell inside the container with GPU support enabled:

```
singularity shell --nv e4s-cuda90-rocky9.6-x86_64-25.11.sif
```

**Explanation:**  
The `--nv` flag exposes the host NVIDIA drivers and GPUs to the container.

---

**Step5: Verify GPU Access Inside the Container**

Inside the container, check GPU visibility:

```
nvidia-smi
```

**Expected Result:**  
The output should display GPU details, confirming that the container has access to the allocated GPU.

## **Best Practices**

* Use E4S containers for users
* Use Spack for customization
* Always bind /scratch
* Match compiler & MPI versions
* Prefer wrapper compilers (kokkos\_cxx)

### **Lab Summary**

In this hands-on lab, you gained practical experience with the **Ecosystem for Extreme-Scale Scientific Software (E4S)** and learned how it simplifies the use of complex HPC software stacks.

You learned how to:

* **Run E4S containers** using Apptainer/Singularity to access a fully configured, reproducible HPC software environment without requiring root privileges.
* **Explore and use the E4S software stack**, including compilers, MPI libraries, and performance-portable programming models such as Kokkos.
* **Compile portable HPC applications** using E4S-provided wrapper compilers, enabling the same source code to run efficiently across different CPU and GPU architectures.
* **Execute MPI workloads inside containers**, integrating containerized applications with host resource managers like Slurm for scalable parallel execution.
* **Run GPU-accelerated workloads** using CUDA-enabled E4S containers, demonstrating performance portability across CPU and GPU platforms.
* **Apply E4S in real HPC environments**, following best practices for container binding, host integration, and reproducible workflows suitable for production systems.

