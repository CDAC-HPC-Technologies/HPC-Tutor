---
title: modules
slug: modules
url: /en/modules/
order: 10
---

# **Environment Modules**

## **1. Introduction to Environment Modules**

### **1.1 What are Environment Modules?**

Environment Modules is a software tool that allows users to dynamically modify their shell environment using modulefiles.  
Instead of manually setting environment variables like PATH, LD\_LIBRARY\_PATH, MANPATH, etc., users can load and unload software environments on demand using simple commands such as module load and module unload.

In multi-user systems like HPC clusters, where multiple versions of compilers, libraries, and applications coexist, Environment Modules provide a clean, flexible, and user-friendly way to manage software stacks without conflicts.

### **1.2 Why Environment Modules are Needed in HPC**

Environment Modules are essential in High Performance Computing (HPC) environments because HPC systems are shared by many users who often require different software stacks at the same time. A single cluster typically hosts multiple versions of compilers, MPI libraries, and scientific applications, each built for specific use cases. Without a proper environment management mechanism, users would need to manually set and maintain environment variables such as PATH, LD\_LIBRARY\_PATH, and MANPATH, which is both error-prone and difficult to manage at scale. This manual approach frequently leads to software conflicts, incompatible library usage, runtime failures, and difficulties in reproducing computational results, especially when multiple applications depend on different versions of the same software.

Environment Modules solve these challenges by providing a dynamic and controlled way to configure user environments. Each software package is represented by a modulefile that encapsulates all necessary environment settings, allowing users to load or unload specific software versions on demand. This makes it easy to switch between different compilers, libraries, or application versions without affecting other users or workflows. By standardizing environment configuration, Modules improve reliability, reproducibility, and usability of HPC systems, enabling users to focus on computation rather than environment setup while allowing administrators to manage complex software ecosystems efficiently.

## **2. History and Evolution of Environment Modules**

Environment Modules was originally developed in the early 1990s at Los Alamos National Laboratory (LANL) to address the growing complexity of managing software environments on shared UNIX systems. As supercomputers evolved and software stacks became more complex, the need for a centralized and flexible environment management system became critical.

Over time, Environment Modules matured into a widely adopted standard across academic institutions, research labs, and supercomputing centers. The original implementation was written in Tcl, and it became the foundation for many modern environment management systems. Today, Environment Modules is actively maintained as an open-source project and serves as the backbone for software management on most HPC clusters worldwide.

## **3. Core Concepts of Environment Modules**

### **3.1 What is a Modulefile?**

A modulefile is a configuration file that describes how a particular software package modifies the user’s environment.

A modulefile typically:

* Adds directories to PATH
* Sets library paths
* Defines environment variables
* Handles dependencies between software

Modulefiles are usually written in Tcl (classic Modules) or Lua (Lmod).

### **3.2 Modulefile Directory Structure**

A typical modulefile directory structure looks like:

/opt/modules/  
├── gcc/  
│   ├── 9.3.0  
│   └── 11.2.0  
│  
├── openmpi/  
│   ├── 4.1.1  
│   └── 4.1.5  
│  
└── python/  
    └── 3.9.6

## **4. Basic Module Commands**

### 4.1 Listing Available Modules

```
module avail
```

Shows all modules available on the system.

### 4.2 Loading a Module

```
module load gcc/11.2.0
```

Updates the environment to use GCC 11.2.0.

### 4.3 Unloading a Module

```
module unload gcc/11.2.0
```

Removes the environment settings applied by the module.

### 4.4 Checking Loaded Modules

```
module list
```

Displays currently loaded modules.

### 4.5 Switching Between Versions

```
module swap gcc/9.3.0 gcc/11.2.0
```

Efficiently replaces one version with another.

## 5. How to Create Your Own Module

Step 1: Decide Software Location

Assume a software installed at:

`/opt/apps/myapp/1.0`

Directory structure:

`/opt/apps/myapp/1.0/  
├── bin/  
├── lib/  
└── include/`

Step 2: Create Modulefile Directory

```
mkdir -p /opt/modules/myapp
```

Step 3: Create a Modulefile

Create:

/opt/modules/myapp/1.0

Modulefile content:

```
#%Module1.0
proc ModulesHelp { } {
    puts stderr "Loads MyApp version 1.0"
}

module-whatis "MyApp 1.0 - Example application"

set root /opt/apps/myapp/1.0

prepend-path PATH            $root/bin
prepend-path LD_LIBRARY_PATH $root/lib
prepend-path CPATH           $root/include
```

Step 4: Add Module Path

Tell Modules where to find custom modulefiles:

```
module use /opt/modules
```

Verify:

```
module avail
```

Step 5: Load Your Module

```
module load myapp/1.0 which myapp
```

## 5. Environment Variables Managed by Environment Modules

One of the core responsibilities of Environment Modules is to manage and control shell environment variables in a consistent and reliable manner. In HPC systems, software is usually installed in non-standard locations, and multiple versions of the same software often coexist. Environment variables act as the communication layer between the user’s shell, the compiler, the linker, and the runtime system. By dynamically modifying these variables, Environment Modules ensure that the correct executables, libraries, and headers are used at every stage of application development and execution.

Instead of users manually exporting or modifying environment variables—which can easily lead to conflicts or misconfiguration—Modules automate this process through modulefiles. Each modulefile contains logic that defines how loading or unloading a module should alter the user’s environment. This guarantees correctness, reproducibility, and ease of use across different shells and workflows.

Environment Modules commonly manage:

* PATH – Executable search path
* LD\_LIBRARY\_PATH – Shared libraries
* LIBRARY\_PATH – Compile-time libraries
* CPATH – Header file paths
* MANPATH – Manual pages
* Application-specific variables (e.g., MPI\_HOME, CUDA\_HOME)

## 6. Dependency Management in Environment Modules

Dependency management is one of the most critical features of Environment Modules, especially in High Performance Computing (HPC) environments. Most HPC applications are not standalone; they are built on top of a complex stack of compilers, MPI libraries, numerical libraries, and system dependencies. If these dependencies are not managed correctly, applications may compile successfully but fail at runtime, or worse, produce incorrect scientific results. Environment Modules help avoid these issues by enforcing consistent and compatible software dependencies.

In an HPC system, software dependencies are often hierarchical. For example, an MPI library such as OpenMPI is built using a specific compiler (e.g., GCC), and applications built with that MPI must use the same compiler–MPI combination. Environment Modules allow administrators to encode these relationships directly into modulefiles so that users automatically get the correct dependency stack without needing to understand all underlying detail

### 6.1 Understanding Software Dependencies in HPC

A dependency is any software component that another software relies on to function correctly. In HPC, dependencies commonly include:

* Compilers (GCC, Intel, AOCC)
* MPI libraries (OpenMPI, MPICH, Intel MPI)
* Math libraries (BLAS, LAPACK, FFTW, MKL)
* System libraries and runtimes

For example:

* An MPI application depends on an MPI library
* The MPI library depends on a compiler
* The compiler depends on system libraries

This creates a layered dependency chain that must remain consistent throughout compilation and execution.

### 6.2 Automatic Dependency Loading

Environment Modules can be configured so that loading one module automatically loads its required dependencies. This behavior is defined inside the modulefile.

Example: OpenMPI depending on GCC

When a user runs:

```
module load openmpi/4.1.5
```

The system ensures that:

* The required compiler module (e.g., gcc/11.2.0) is loaded first
* The OpenMPI environment is configured on top of that compiler

Conceptually, this happens as follows:

`User Command  
    │  
    │ module load openmpi/4.1.5  
    ▼  
Environment Modules  
    │  
    │ detects dependency  
    ▼  
module load gcc/11.2.0  
    │  
    ▼  
OpenMPI environment configured`

From the user’s perspective, this process is seamless—they only load OpenMPI, but the correct compiler is automatically selected.

### 6.3 Preventing ABI Incompatibilities

ABI (Application Binary Interface) incompatibilities occur when software components are built with different or incompatible compilers or compiler versions. Even if compilation succeeds, binaries may crash or behave unpredictably at runtime.

Environment Modules prevent ABI issues by:

* Ensuring dependent software is built and used with the same compiler
* Restricting incompatible combinations through dependency rules
* Encouraging consistent compiler–MPI stacks

For example, an application compiled with:

```
  gcc/11.2.0 + openmpi/4.1.5
```

must **not** run with:

```
  gcc/9.3.0 + openmpi/4.1.5
```

Modules enforce this consistency automatically, protecting users from subtle and hard-to-debug failures.

### 6.4 Avoiding Runtime Crashes

Runtime crashes in HPC applications are often caused by:

* Incorrect shared libraries being loaded
* Mismatched MPI implementations
* Conflicting environment variables

When dependencies are manually managed, a user might unknowingly mix incompatible libraries in LD\_LIBRARY\_PATH. Environment Modules avoid this by loading dependency modules in a controlled order and ensuring that runtime paths point only to compatible libraries.

As a result:

* MPI jobs start reliably
* Applications link against correct shared libraries
* Debugging time is significantly reduced

### 6.5 Ensuring Correct Builds

Dependency management is just as important during compilation as it is during execution. Environment Modules ensure that:

* Header files (CPATH) come from the correct dependency
* Libraries (LIBRARY\_PATH) match the loaded compiler and MPI
* Build tools detect the intended software stack

This leads to:

* Clean and repeatable builds
* Fewer compilation errors
* Reduced need for manual compiler and linker flags

For example:

```
module load gcc/11.2.0
module load openmpi/4.1.5
mpicc mycode.c -o mycode
```

Here, `mpicc` is guaranteed to come from the OpenMPI build that matches GCC 11.2.0.

### 6.6 User Experience vs Administrator Control

From the user’s perspective, dependency management means:

* Fewer commands to remember
* Less chance of mistakes
* Reliable and reproducible environments

From the administrator’s perspective, it means:

* Centralized control over software compatibility
* Easier maintenance of multiple software stacks
* Reduced support requests caused by misconfigured environments

This separation of concerns is one of the major strengths of Environment Modules.

## 7. User vs System Modules

### 7.1 System Modules

* Installed and maintained by system administrators
* Located in shared directories (e.g., /opt/modules)
* Available to all users

### 7.2 User Modules

* Created by individual users
* Stored in personal directories
* Useful for testing or custom builds

Users can add their own module paths:

### `module use ~/my_modules` **References** <https://envmodules.io/>

