---
title: Introduction to kokkos
slug: introduction_to_kokkos
url: /en/introduction-to-kokkos/
order: 7
---

# **Empowering NSM Supercomputers with Kokkos for Scalable HPC**

### **1. Overview**

India’s High-Performance Computing (HPC) initiative seeks to strengthen the national academic and research ecosystem through the deployment of supercomputing infrastructure across institutions and government organizations, while enabling application development for nationally important challenges and building a skilled HPC workforce.

### **Key Goals**

* **Deploy supercomputing infrastructure** across academic institutions, research organizations, and government bodies nationwide.
* **Enable advanced computational research** to address challenges of national importance.
* **Develop and sustain a skilled HPC workforce** to support research, innovation, and operations.
* **Promote self-reliance in HPC technologies** through indigenous development and adoption.

### **2. Objectives**

* Establish India as a global leader in supercomputing
* Enhance computational capability to address grand challenge problems
* Provide state-of-the-art HPC infrastructure for advanced research
* Optimize investments by minimizing redundancy in supercomputing resources
* Achieve self-reliance and global competitiveness in HPC technology

### 

### **3. Challenges in Application Porting**

* **Modern HPC systems** such as Rudra employ heterogeneous hardware architectures, including CPUs, GPUs, and high-memory nodes, requiring applications to be portable across all supported platforms for efficient utilization.
* **Many legacy scientific applications** are designed primarily for CPU-based execution and are unable to effectively leverage modern accelerator technologies such as GPUs.
* **Portable programming frameworks** such as Kokkos are essential to support the “compile once, run anywhere” paradigm across diverse hardware architectures.
* **Performance optimization** differs significantly across CPUs, GPUs, and complex memory hierarchies, thereby increasing the overall complexity and effort required for application tuning.
* **Achieving reproducible performance** across multiple National Supercomputing Mission (NSM) sites remains a challenge due to architectural and system-level variations.

## 

### 4. Introduction to KOKKOS

**KOKKOS (Kernels for Offloadable, Manycore, and Accelerators)** is a performance portability programming model designed for high-performance scientific computing on heterogeneous architectures.

**Who & When**

* Developed by researchers at **Sandia National Laboratories**
* Initial development started around **2009**
* First public release in **2011**
* Open-source project with **400+ forks**

KOKKOS enables developers to write parallel C++ code that runs efficiently across multi-core CPUs, GPUs, and accelerators without architecture-specific rewrites.

### 5. What is KOKKOS?

* **Kokkos is a C++ performance-portability library** designed to enable efficient execution across diverse hardware architectures.
* **Developed by Sandia National Laboratories**, Kokkos provides a programming model that supports modern HPC systems.
* **The core philosophy of Kokkos** is “write once, run efficiently on any architecture,” enabling portable and scalable application development.

### **6. Key Features of KOKKOS**

**6.1 Execution Spaces**

Kokkos provides multiple execution spaces, including CUDA, HIP, OpenMP, and Threads, enabling parallel execution across a wide range of CPU and GPU architectures.

**6.2 Memory Spaces**

Kokkos supports distinct memory spaces such as host memory, device memory, and unified memory, allowing applications to manage data placement efficiently across heterogeneous systems.

**6.3 Views**

Kokkos Views provide multi-dimensional array abstractions that decouple data layout from memory space, enabling portable and efficient memory access.

**6.4 Execution Policies**

Kokkos offers execution policies such as `parallel_for` and `parallel_reduce` to express parallelism in a portable and architecture-agnostic manner.

**6.5 Portability**

Kokkos enables a single codebase to run efficiently on both CPU- and GPU-based clusters, ensuring performance portability across diverse HPC platforms.

### 

### **7. Advantages of Kokkos**

* **Performance portability** enables efficient execution across multiple hardware architectures without the need to maintain separate codebases.
* **Abstraction** provides a high-level programming model that hides hardware-specific details while preserving performance.
* **High performance** is achieved through built-in optimizations tailored for diverse hardware platforms.
* **Developer productivity** is improved through a consistent programming model that simplifies application development and long-term maintainability.
* **Open-source development** is supported by a strong community that encourages collaboration, transparency, and continuous improvement.

### **8. Observations and Expectations**

**Observations**

* KOKKOS effectively hides architecture-specific complexity
* Supports rapid prototyping and production-grade performance

**Expectations**

* Expanded support for additional languages (Fortran, Python)
* Improved debugging and profiling tool integration

### **9. Why KOKKOS?**

The growing heterogeneity of modern computing systems necessitates a framework that simplifies parallel programming while retaining performance.

**KOKKOS:**

* Provides high-level abstractions for heterogeneous systems
* Enables easy portability without performance loss
* Offers fine-grained control over parallel execution
* Supports task- and data-dependency-based parallelism

### **10. Industry Acceptance of Kokkos**

1. Adoption by National Laboratories

   * Lawrence Berkeley National Laboratory
   * Lawrence Livermore National Laboratory (LLNL)
   * Los Alamos National Laboratory
   * Oak Ridge National Laboratory
   * Sandia National Laboratories
2. Growing Community

   * 1,700+ GitHub stars
   * 450+ forks (as of September 2021)
   * Contributors from academia, industry, and national laboratories
3. Integration with Other Libraries

   * Trilinos
   * Ginkgo
   * RAJA
4. Conference Presence

   * SC (Supercomputing Conference)
   * Euro-Par
   * SC Asia

### **11. Heterogeneous Programming Models: Kokkos vs SYCL**

| Kokkos | SYCL |
| --- | --- |
| Kokkos is a C++ performance portability library designed to write parallel applications that can run efficiently on diverse hardware architectures. | SYCL is a C++-based open standard programming model for heterogeneous computing across CPUs, GPUs, and other accelerators. |
| It follows a parallel execution and memory abstraction model, enabling performance portability across CPUs, GPUs, and many-core systems. | SYCL uses a data-parallel execution model and is built on top of lower-level backends such as OpenCL, CUDA, or HIP. |
| Developers explicitly manage execution and memory spaces, allowing fine-grained control and optimization for specific hardware targets. | SYCL provides a single-source programming model where host and device code coexist in the same C++ source file. |
| Kokkos is widely used in HPC applications where performance portability and scalability are critical. | SYCL focuses on portability, productivity, and standards-based heterogeneous programming. |

### **12. Compiling KOKKOS Applications**

* At the time of installation of KOKKOS we need to specify the target architectures, accordingly it creates the specific library and header files.
* Once you successfully setup KOKKOS environment for the target architecture, you can use it on different architectures as follows

**OpenMP Environment:**

```
g++ -I/path/to/kokkos/include -O3 -std=c++11 -fopenmp -o program-openmp kokkos.cpp
```

```
./program-openmp
```

**HIP Environment:**

```
hipcc -I/path/to/kokkos/include -O3 -std=c++11 -arch=gfx906 -o program-hip kokkos.cpp
```

```
./program-hip
```

**CUDA Environment:**

```
nvcc -I/path/to/kokkos/include -O3 -std=c++11 -arch=sm_60 -o program-cuda kokkos.cpp
```

```
./program-cuda
```

**MPI Environment**

```
mpic++ -I/path/to/kokkos/include -O3 -std=c++11 -o program-mpi kokkos.cpp
```

**Run the executable:**

```
./program-mpi
```

**Note:** Compilation options may vary depending on platform and backend.

### **13. Experiments & Observations**

**Objective**

Evaluate the performance of LAMMPS with and without Kokkos support across multiple CPU and GPU architectures.

**Platforms Tested**

* ARM A64FX (CPU)
* Intel Cascade Lake (CPU)
* NVIDIA A100 (GPU)
* AMD Instinct MI210 (GPU)

#### 

**Performance Results**

| Application: LAMMPS | | | | | | | |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ARM A64FX (CPU) | | Intel Cascade Lake (CPU) | | NVIDIA A100 (GPU) | | AMD MI210 (GPU) | |
| With Kokkos | Without Kokkos | With Kokkos | Without Kokkos | With Kokkos | Without Kokkos | With Kokkos | Without Kokkos |
| 810 m | 1217 m | 226 m | 311 m | 3 m 42 s | 4 m 7 s | 6 m 2 s | 6 m 25 s |

**Key Observations**

* **CPU Performance Improvement**
  + ARM A64FX: ~1.5× improvement
  + Intel Cascade Lake: ~1.3× improvement
* **GPU Performance**
  + NVIDIA A100: ~1.1× improvement
  + AMD MI210: Comparable performance

### **14. Benefits Summary**

* **Performance Portability:** Kokkos enables developers to write a single codebase that runs efficiently across a wide range of hardware architectures without platform-specific implementations.
* **Abstraction:** Kokkos provides a high-level abstraction layer, allowing developers to focus on algorithms rather than low-level hardware details.
* **Performance:** The framework offers numerous optimizations and execution backends that help achieve high performance on diverse platforms.
* **Productivity:** A consistent programming model across architectures improves developer productivity and code maintainability.
* **Open Source:** Kokkos is open source, fostering a strong and collaborative community that continuously improves the framework.

### **15. Future Explorations**

* Advanced programming aspects of Kokkos
* Exploration of additional Kokkos-enabled applications:
  + LAMMPS
  + GROMACS
  + QMCPACK
  + PUMI
* Performance comparison between Kokkos and SYCL
* Sample application comparison (GROMACS with SYCL vs. Kokkos)

### **16. References**

1. <https://github.com/kokkos/kokkos.git>
2. Trott, Christian R., et al. “Kokkos 3: Programming model extensions for the exascale era.” *IEEE Transactions on Parallel and Distributed Systems*, vol. 33, no. 4, 2021, pp. 805–817.
3. Edwards, H. Carter, and Christian R. Trott. “Kokkos: Enabling performance portability across manycore architectures.” *Extreme Scaling Workshop (XSW)*, IEEE, 2013.
4. Edwards, H. Carter, and Daniel Sunderland. “Kokkos array performance-portable manycore programming model.” *Proceedings of the International Workshop on Programming Models and Applications for Multicores and Manycores*, 2012.
5. Hammond, Jeff R., Michael Kinsner, and James Brodman. “A comparative analysis of Kokkos and SYCL as heterogeneous, parallel programming models for C++ applications.” *Proceedings of the International Workshop on OpenCL*, 2019.
6. Edwards, H. Carter, et al. “Manycore performance-portability: Kokkos multidimensional array library.” *Scientific Programming*, vol. 20, no. 2, 2012, pp. 89–114.

