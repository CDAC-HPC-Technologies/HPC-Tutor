---
title: Introduction E4S
slug: introduction_e4s
url: /en/introduction-e4s/
order: 5
---

# Introduction to E4S

**E4S turns expensive supercomputers into powerful engines for discovery by giving scientists the software ecosystem they need.**

Scientific discovery today depends on powerful computers—machines that can build and execute new AI models, design new medicines, improve energy systems, and simulate the behavior of stars. But just as important as the hardware are the software tools that scientists need to harness this computing power. Developing, maintaining, and making these tools widely available is the mission of the Ecosystem for Scientific Software (E4S), a collection of software for compute-intensive modeling, simulation, and AI.

### **What is E4S?**

E4S is a **curated ecosystem** of **open-source** software that scientists and engineers use to do large-scale computing. Think of E4S as an app store of reliable, tested, and interoperable tools for solving scientific problems.

* **Curated:** The collection is tested, documented, and supported so that scientists can focus on research.
* **Ecosystem:** Many products, working together.
* **Open-source:** Anyone can inspect, use, and contribute, ensuring transparency and long-term availability.

### **Why Does E4S Matter?**

With E4S, scientific teams avoid building common computing tools from scratch, avoid duplicating effort and delaying discovery. **E4S ensures U.S. R&D investments have sustained impact.**

* **Scientists work better and faster:** Ready-to-use tools mean less time reinventing the wheel.
* **Taxpayer supercomputer investments maximized:** Software investments unlock hardware capabilities.
* **The U.S. maintains leadership:** E4S keeps America at the forefront of scientific innovation.

### **A Simple Analogy**

Imagine trying to build a house if every team had to design its own hammers, saws, and measuring tapes. Progress would be slow and costly. E4S provides the shared toolkit of reliable instruments that every scientific team can use, so they can focus on building new knowledge instead of tools.

### **How to Access E4S Products**

E4S products are accessible in many ways:

1. Each product is directly installable using Spack.
2. E4S has its own Spack scripts that install the full collection of products that are part of E4S. This script can be copied and pruned to suit your needs.
3. E4S is available in containers on AWS and Google Cloud environments.
4. E4S is available from a variety of containers including several minimal base containers that enable to you to establish a base image and install compatible versions of the products you want to use.

In all cases, products benefit from being part of E4S by participating in the integration and testing support that E4S provides. Even when using an E4S-supported product independent of E4S, you benefit from the portability testing and version compatibility that E4S efforts enhance.

### **Who This Is For**

E4S Learning is organized for multiple audiences, each with distinct needs and entry points.

**Newcomers and Explorers**

Graduate students, postdocs, and new staff seeking an overview of E4S and how its components fit together.

**You will gain:** orientation, vocabulary, and a clear path to first success.

**Application Developers**

Domain scientists and research programmers building or modernizing applications.

**You will gain:** guidance on performance portability, correctness, and sustainable development.

**Software and Infrastructure Engineers**

Those responsible for build systems, packaging, CI/CD, containers, and deployment.

**You will gain:** reproducible workflows and ecosystem-level integration strategies.

**Facility, Program, and Project Stakeholders**

Center leadership, program managers, and vendors.

**You will gain:** insight into ecosystem structure, adoption signals, and long-term sustainability.

## 

### **How to Download and Install E4S**

E4S is distributed using **Spack**, a flexible package manager designed for high-performance computing environments. Spack allows users to install multiple versions of scientific software and manage complex dependencies without requiring administrator privileges. By using Spack, E4S ensures that all its components are compatible, reproducible, and portable across different systems.

**Prerequisites**

Before installing E4S, ensure the following tools are available on your system:

* Linux-based operating system
* `git`
* `gcc` or another supported compiler
* `python3`

Verify the prerequisites:

1. git --version
2. gcc --version
3. python3 --version

### 

### **Method 1: Downloading and Installing E4S Using Spack**

Spack is the primary and recommended way to download and install E4S. It builds E4S packages from source and manages dependencies, compilers, and system configurations in a reproducible manner.

---

**Step 1: Download Spack**

Clone the Spack repository from GitHub:

```
git clone https://github.com/spack/spack.git
```

---

**Step 2: Initialize the Spack Environment**

Move into the Spack directory and set up the environment:

```
cd spack source share/spack/setup-env.sh
```

---

**Step 3: Verify Spack Installation**

Confirm that Spack is available:

```
spack --version
```

---

**Step 4: Add the E4S Spack Configuration**

E4S provides curated Spack configuration files that define compatible versions of its software stack.

```
spack repo add https://github.com/E4S-Project/e4s-spack-configs.git
```

---

**Step 5: Verify the E4S Repository**

Ensure that the E4S repository has been added successfully:

```
spack repo list
```

---

### Step 6: Select an E4S Release

Navigate to the available E4S environments and select a release version:

```
ls e4s-spack-configs/environments 
cd e4s-spack-configs/environments/e4s-23.08
```

---

**Step 7: Activate the E4S Environment**

Activate the selected E4S environment:

```
spack env activate .
```

---

### Step 8: Install the E4S Software Stack

Install the full E4S software stack:

```
spack install
```

---

### Step 9: Load and Verify Installed Packages

Load required packages and verify the installation:

```
spack load openmpi 
mpicc --version
```

### **Method 2: Downloading E4S Using Containers (Apptainer / Docker)**

E4S provides pre-built container images that include compatible versions of E4S software. Containers allow users to run E4S without compiling from source.

**Step 1: Install Apptainer or Docker**

Ensure a container runtime is available on your system.

Check Apptainer:

```
apptainer --version
```

Check Docker:

```
docker --version
```

---

**Step 2: Download the E4S Container Image**

Using Apptainer:

```
apptainer pull e4s.sif docker://ecpe4s/e4s-base
```

Using Docker:

```
docker pull ecpe4s/e4s-base
```

---

**Step 3: Run the E4S Container**

Using Apptainer:

```
 apptainer exec e4s.sif bash
```

Using Docker:

```
 docker run -it ecpe4s/e4s-base /bin/bash
```

---

**Step 4: Verify E4S Software Inside the Container**

```
 spack find
```

---

### **Method 3: Accessing E4S on Cloud Platforms (AWS / Google Cloud)**

E4S is available on cloud platforms through pre-configured virtual machines and container images.

**Step 1: Launch a Cloud Instance**

Create a virtual machine on AWS or Google Cloud with Docker or Apptainer installed.

---

**Step 2: Download the E4S Container**

```
 docker pull ecpe4s/e4s-base
```

---

**Step 3: Run the E4S Environment**

```
 docker run -it ecpe4s/e4s-base
```

---

**Step 4: Verify Installation**

```
 spack find
```

---

### **Method 4: Using Facility or Vendor-Provided E4S Installations**

Many HPC centers provide E4S as a centrally installed software stack.

**Step 1: Check Available E4S Modules**

```
 module avail e4s
```

---

**Step 2: Load the E4S Module**

```
 module load e4s
```

---

**Step 3: Verify Available Packages**

```
 spack find
```

---

### **Method 5: Installing Selected E4S Packages Individually**

Users may install only required E4S-supported packages instead of the full stack.

**Step 1: Initialize Spack**

```
 source spack/share/spack/setup-env.sh
```

---

**Step 2: Install Required Packages**

```
 spack install openmpi spack install hdf5 spack install kokkos
```

---

**Step 3: Load Installed Packages**

```
 spack load openmpi
```

---

### **Method 6: Creating a Custom E4S Installation**

Advanced users can create a custom E4S environment with selected packages.

**Step 1: Create a New Spack Environment**

```
 spack env create custom-e4s
```

---

**Step 2: Activate the Environment**

```
 spack env activate custom-e4s
```

---

**Step 3: Add Required Packages**

```
 spack add hdf5 kokkos openmpi
```

---

**Step 4: Install the Packages**

```
 spack install
```

---

**Step 5: Verify Installation**

```
 spack find
```

### **E4S Documentation & Community** :

* E4S Home Page: <https://e4s.io/>
* GitHub Project: <https://github.com/E4S-Project/e4s>
* E4S Dashboard: <https://dashboard.e4s.io/>

