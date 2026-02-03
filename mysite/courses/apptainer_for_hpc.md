---
title: Apptainer for HPC
slug: apptainer_for_hpc
url: /en/apptainer-for-hpc/
order: 8
---

# Introduction to Apptainer for HPC

### **Introduction**

Modern HPC applications depend on complex software stacks with many dependencies. Installing and maintaining these stacks across different systems is time-consuming and error-prone. **Apptainer** addresses this challenge by allowing users to package applications, libraries, and environments into a single portable container file.

With Apptainer, containers can be built once and run anywhere—from laptops to leadership-class supercomputers—without requiring root privileges. This makes Apptainer especially well-suited for **HPC, research computing, and shared cluster environments**.

### **What is Apptainer?**

Apptainer is an **open-source container platform optimized for HPC**. It enables users to create and run containers that encapsulate the complete user-space environment of an application while relying on the host Linux kernel.

Key characteristics:

* Containers are stored as a **single SIF (Singularity Image Format) file**
* No daemon or background service required
* Users inside the container remain the **same user as on the host**
* Designed to integrate seamlessly with HPC hardware and schedulers

### **Why Apptainer for HPC?**

Apptainer was originally developed at **Lawrence Berkeley National Laboratory** to meet the needs of HPC centers. Unlike general-purpose container platforms, Apptainer focuses on **integration rather than isolation**.

### Key Advantages

* **Reproducibility & Security**

  + Immutable container images
  + Cryptographic signing and verification
  + No privilege escalation inside containers
* **Native HPC Integration**

  + Direct access to GPUs, high-speed interconnects, and parallel filesystems
  + Seamless use with Slurm and MPI
* **Portability**

  + Single-file containers are easy to move and share
  + Same container runs across different Linux distributions
* **User-Friendly Security Model**

  + You are not root inside the container
  + Matches the security expectations of shared HPC systems

### **Why Use Containers?**

Traditional Linux systems tightly couple the kernel and user space. This makes it difficult to:

* Run software built for a different Linux distribution
* Maintain multiple versions of libraries
* Reproduce older scientific workflows

Containers solve this by **making the user space portable**. Apptainer packages applications, libraries, and configurations into a container while using the host kernel. This allows developers to choose the best OS environment for their software and ensures users never need to manage complex dependencies.

### **Common Use Cases**

**Bring Your Own Environment (BYOE)**

Researchers can build and carry their own software environment without relying on system-wide installations.

**Reproducible Science**

Entire experiments—including code, libraries, and scripts—can be preserved and shared as containers.

**Commercial and Certified Software**

Applications certified for specific Linux versions can continue to run unchanged on modern systems.

**Legacy Software**

Old or unsupported operating systems and software stacks can be preserved and executed on new hardware.

**Complex and Host-Specific Workflows**

Applications with difficult build and dependency chains can be containerized once and reused reliably.

### **Apptainer Installation Overview**

Apptainer runs on **Linux systems** and does not require root access if user namespaces or fakeroot are available.

Installation options include:

* Pre-built RPM or DEB packages
* Building from source
* Unprivileged (user-only) installations

### **Overview of the Apptainer Interface**

Apptainer provides a **simple command-line interface** to interact with containers.

**Basic help:**

```
apptainer help
```

Key subcommands:

* **`pull`** – Download container images
* **`build`** – Create container images
* **`shell`** – Start an interactive shell
* **`exec`** – Run a command inside a container
* **`run`** – Execute the container’s default runscript
* **`inspect`** – View container metadata

Apptainer uses **positional syntax**, meaning command order matters.

### **Hands-On Labs**

**Lab 0 – Verify Environment**

**1. Install Apptainer (System-Wide)**

> Use this when you want Apptainer available to **all users** on the system.

i. Enable required repositories

```
sudo dnf install -y epel-release
```

ii. Install Apptainer

```
sudo dnf install -y apptainer
```

iii. Verify installation

```
apptainer --version which apptainer
```

Expected:

 apptainer version X.Y.Z /usr/bin/apptainer

✔ Apptainer is now installed **system-wide**

---

**2.  Install Apptainer Using Spack**

> Use this when you want Apptainer **managed by Spack** (user-level or module-based).

i. Load Spack environment

```
. /path/to/spack/share/spack/setup-env.sh
```

ii. Check available Apptainer package

```
spack info apptainer
```

iii. Install Apptainer via Spack

```
spack install apptainer
```

iv. Load Spack-installed Apptainer

```
spack load apptainer
```

v. Verify Spack Apptainer

```
which apptainer apptainer --version
```

Expected:

/path/to/spack/opt/.../bin/apptainer

✔ Apptainer is now available **via Spack**

### **Lab 1 – Run Your First Container (No Build)**

**Objective:** Run an existing container image without building anything.

Pull an image:

```
apptainer pull alpine.sif docker://alpine:latest
```

Run a command:

```
apptainer exec alpine.sif cat /etc/os-release
```

Start a shell:

```
apptainer shell alpine.sif
```

Inside the container:

```
whoami pwd touch testfile exit
```

### 

## 

### **Lab 2 – Host Filesystem Binding**

**Objective:** Understand file sharing between host and container.

```
mkdir -p ~/apptainer_lab 
echo "Hello HPC" > ~/apptainer_lab/host.txt
```

Access from container:

```
cat ~/apptainer_lab/host.txt
```

Explicit bind:

```
apptainer exec --bind ~/apptainer_lab:/data alpine.sif ls /data
```

### **Lab 3 – Build Your Own Image**

**Objective:** Create a reproducible container using a definition file.

Create `hello.def`:

```
cat > hello.def <<EOF
Bootstrap: docker
From: rockylinux:9

%post
    dnf -y install epel-release
    dnf -y install cowsay
    dnf clean all

%runscript
    cowsay "Hello from Apptainer Lab!"
EOF
```

Build:

```
apptainer build --fakeroot hello.sif hello.def
```

Run:

```
apptainer run hello.sif
```

##

### **Lab 4 – Environment & Reproducibility**

Create a new definition file `lab4.def` (or edit your existing container `.def`):

```
cat > lab4.def <<EOF
Bootstrap: docker
From: rockylinux:9

%environment
    export LAB_NAME="Apptainer-HPC"
EOF
```

Rebuild and verify:

```
apptainer build --fakeroot lab4.sif lab4.def 
apptainer exec lab4.sif env | grep LAB
```

### **Lab 5 – MPI with Host Launcher (Using Spack)**

**Objective:**

Use host MPI with containerized applications. Compile MPI programs on the host using Spack-managed MPI.

---

**Step 1: Load Spack**

Assuming Spack is installed in `/home/apps`:

`. /home/apps/spack/share/spack/setup-env.sh`

* This loads Spack into your shell.
* Verify:

```
 spack --version
```

---

**Step 2: Load or install MPI**

2a. Check if OpenMPI is already installed:

```
 spack find openmpi
```

* If it lists a version, MPI is ready.

2b. If MPI is not installed, install it:

```
 spack install openmpi
```

* This installs OpenMPI in **your user space**, no sudo required.

2c. Load OpenMPI environment

```
 spack load openmpi
```

* Now `mpicc`, `mpirun`, and libraries are available.
* Verify:

```
 which mpicc 
mpicc --version
```

### **Step 3: Create MPI program**

Create a file `mpi_hello.c`:

```
cat > mpi_hello.c <<EOF
#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv) {
    MPI_Init(&argc, &argv);  // Initialize MPI

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank); // Get process rank
    MPI_Comm_size(MPI_COMM_WORLD, &size); // Get total number of processes

    printf("Hello from process %d of %d\\n", rank, size);

    MPI_Finalize(); // Finalize MPI
    return 0;
}
EOF
```

### **Step 4: Compile the MPI program on the host**

```
mpicc mpi_hello.c -o mpi_hello
```

* This produces an executable `mpi_hello` using Spack-managed MPI.

---

### **Step 5: Run the MPI program**

```
mpirun -np 4 ./mpi_hello
```

* `-np 4` runs with 4 processes.
* Expected output (order may vary):

```
Hello from process 0 of 4 
Hello from process 1 of 4 
Hello from process 2 of 4 
Hello from process 3 of 4
```

### **Lab 6 – GPU Binding (Optional)**

Pull CUDA image:

```
apptainer pull cuda.sif docker://nvidia/cuda:12.3.0-runtime-rockylinux9
```

Without GPU binding:

```
apptainer exec cuda.sif nvidia-smi
```

With GPU binding:

```
apptainer exec --nv cuda.sif nvidia-smi
```

### **Lab Summary**

In this module, you learned how to:

* Understand Apptainer’s role in HPC environments
* Run and interact with container images
* Bind host filesystems and resources
* Build reproducible container images
* Execute MPI and GPU workloads using containers
* Integrate Apptainer with Slurm for production HPC use

