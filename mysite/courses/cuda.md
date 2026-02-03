---
title: CUDA
slug: cuda
url: /en/cuda/
order: 4
---

# **Introduction to CUDA-Based GPU Computing**

## 1. Introduction to GPU Computing (GPGPU)

### 1.1 What is GPU Computing

GPU Computing refers to using a Graphics Processing Unit (GPU) to perform computations that are traditionally handled by a Central Processing Unit (CPU). GPGPU (General-Purpose computing on Graphics Processing Units) allows developers to use GPUs for general-purpose scientific and engineering computations, not just graphics rendering. GPUs contain thousands of small processing cores designed to execute many operations in parallel, making them ideal for workloads that involve repetitive calculations on large datasets.

Key characteristics of GPU computing:

* Massive parallelism
* High throughput
* Optimized for data-parallel workloads
* Accelerates compute-intensive applications

### 1.2 Difference Between CPU and GPU

| Feature | CPU | GPU |
| --- | --- | --- |
| Core Design | Few powerful cores | Thousands of smaller cores |
| Execution Style | Sequential and control-heavy | Massively parallel |
| Latency | Low latency | High throughput |
| Best For | Complex logic, branching | Data-parallel computations |
| Memory Access | Optimized for caching | Optimized for bandwidth |
| Typical Use | General-purpose computing | HPC, AI, scientific simulations |

### 1.3 Why GPU Computing is Important

GPU computing is important because it:

* Provides massive parallelism
* Significantly reduces execution time
* Handles large datasets efficiently
* Offers better performance per watt than CPUs
* Accelerates complex mathematical and scientific computations

### 1.4 Applications of GPU Computing

1. GPU Computing in HPC

GPUs are widely used in HPC to accelerate simulations and numerical computations such as:

* Molecular dynamics (GROMACS, NAMD)
* Computational fluid dynamics (CFD)
* Weather and climate modeling

2. GPU Computing in Artificial Intelligence (AI)

GPUs provide massive acceleration for AI and machine learning workloads:

* Deep neural network training
* Image and speech recognition
* Natural language processing

3. GPU Computing in Scientific Simulations

GPUs enable faster and more accurate scientific simulations in fields such as:

* Physics and chemistry simulations
* Material science and quantum modeling
* Bioinformatics and genomics

## 2. GPU Architecture

### 2.1 Streaming Multiprocessors (SMs)

A GPU is composed of multiple Streaming Multiprocessors (SMs). Each SM acts as an independent processing unit capable of executing thousands of threads concurrently.

Key features of SMs:

* Execute warps (groups of 32 threads)
* Manage thread scheduling and execution
* Share fast on-chip memory among threads

### 2.2 GPU Cores, Tensor Cores, and Registers

GPU Cores (CUDA Cores)

* CUDA cores are simple arithmetic units inside each SM.
* Designed to perform floating-point and integer operations.
* Thousands of CUDA cores allow GPUs to execute many threads simultaneously.

Tensor Cores

* Specialized hardware units for matrix and tensor operations.
* Used primarily in AI and deep learning workloads.
* Provide extremely high performance for mixed-precision operations (FP16, BF16).

Registers

* Fastest memory available to a thread.
* Each thread has its own private registers.
* Excessive register usage can reduce parallelism (register pressure).

### 2.3 GPU Memory Hierarchy

Efficient memory usage is crucial for GPU performance. GPU memory is organized in a hierarchy based on speed and accessibility.

Registers

* Fastest memory
* Private to each thread
* Lowest latency

Shared Memory

* On-chip memory shared among threads within the same block
* Very fast and programmer-managed
* Ideal for data reuse and inter-thread communication

Global Memory

* Large off-chip memory accessible by all threads
* High latency compared to registers and shared memory
* Used for main data storage

Constant Memory

* Read-only memory
* Cached and optimized for broadcasting same value to many threads
* Suitable for constants and configuration parameters

Texture Memory

* Read-only memory optimized for spatial locality
* Often used in image processing and scientific visualization
* Provides hardware caching and interpolation support

### 2.4 Compute Capability and Clock Rates

Compute Capability

* Represents the GPU architecture version
* Defines supported features, instruction sets, and hardware capabilities
* Written as major.minor (e.g., 7.5, 8.0)

Higher compute capability means:

* Better performance
* More advanced features
* Improved memory and instruction support

Clock Rates

* Determines how fast GPU cores operate
* Measured in MHz or GHz
* Includes:

  + Base clock
  + Boost clock

Lab Step: Check GPU Info:

Observe GPU name, memory, and compute capability.

```
nvidia-smi
```

## 3. CUDA Programming Model

The CUDA programming model provides a simple and scalable way to write parallel programs that execute on NVIDIA GPUs. It allows developers to express parallelism using threads organized into blocks and grids.

### 3.1 Threads, Blocks, and Grids

CUDA follows a hierarchical execution model:

Threads

* A thread is the smallest unit of execution in CUDA.
* Each thread executes the same kernel code but operates on different data.
* Thousands of threads run concurrently on the GPU.

Blocks

* Threads are grouped into blocks.
* Threads within the same block:

  + Can cooperate using shared memory
  + Can synchronize using \_\_syncthreads()
* A block executes on a single Streaming Multiprocessor (SM).

Grids

* A grid is a collection of blocks.
* All blocks in a grid execute the same kernel.
* Blocks in different grids cannot directly communicate.

### 3.2 Kernel Functions

A kernel is a function that runs on the GPU and is executed by many threads in parallel.

Key points about CUDA kernels:

* Declared using the \_\_global\_\_ keyword
* Launched from the CPU (host) to the GPU (device)
* Executed simultaneously by all threads in the grid

Example (conceptual):

```
__global__ void add(int *a, int *b, int *c) {
    int idx = threadIdx.x;
    c[idx] = a[idx] + b[idx];
}
```

### 3.3 Thread Indexing

Each CUDA thread has a unique ID used to determine which data it processes.

Built-in CUDA Variables

* threadIdx → Thread ID within a block
* blockIdx → Block ID within a grid
* blockDim → Number of threads per block
* gridDim → Number of blocks in the grid

Global Thread Index

To calculate a global index:

`int idx = blockIdx.x * blockDim.x + threadIdx.x;`

This indexing allows each thread to work on a unique data element.

## 4. Memory Management in CUDA

### 4.1 Memory Allocation in CUDA

**4.1.1 Device Memory Allocation – cudaMalloc**

cudaMalloc is used to allocate memory in GPU global memory.

Example:

`int *d_a;  
cudaMalloc((void**)&d_a, N*sizeof(int))`

**4.1.2 Unified Memory Allocation – cudaMallocManaged**

Unified Memory provides a single memory space accessible by both CPU and GPU.

Example:

`int *a;  
cudaMallocManaged(&a, N*sizeof(int));`

### 4.2 Shared & Global Memory Optimization

* Global memory is slow, so accesses should be minimized
* Use coalesced access for better performance
* Load data once and reuse using shared memory
* Shared memory is fast, on-chip, and shared within a block

### 4.3 Memory Coalescing

* Happens when threads access consecutive memory locations
* Coalesced access → High performance
* Non-coalesced access → Low performance

### 4.4 Bank Conflicts

* Shared memory is divided into banks
* Bank conflict occurs when multiple threads access the same bank
* Causes performance reduction
* Avoid using proper access patterns or padding

## 5. GPU Performance and Optimization Techniques

### 5.1 FLOPs and Occupancy

* FLOPs: Measure GPU compute capability
* Used to compare GPUs and estimate performance
* Occupancy: Ratio of active warps to maximum warps per SM
* Higher occupancy helps hide memory latency
* Limited by registers, shared memory, and block size

### 5.2 Thread Divergence

* Occurs when threads in a warp follow different execution paths
* Causes serialized execution and performance loss
* Minimize by reducing conditional branches in kernels

### 5.3 Load Balancing and Warp Scheduling

* Load balancing ensures equal work for all threads
* Poor balance leads to idle GPU resources
* GPU executes threads in groups of 32 (warps)
* Warp scheduler switches between warps to hide latency

## 6. GPU Interconnects and Multi-GPU Systems

Modern HPC and AI workloads often require more computational power and memory than a single GPU can provide. Multi-GPU systems and high-speed GPU interconnects enable scalable performance by allowing GPUs to communicate efficiently with each other and with the CPU.

### 6.1 GPU Interconnect Technologies

GPU interconnects define how data is transferred between CPU ↔ GPU and GPU ↔ GPU.

**6.1.1 PCIe (Peripheral Component Interconnect Express)**

PCIe is the most common interconnect between CPU and GPU.

Key features:

* Widely available
* Supports all GPUs
* Moderate bandwidth and higher latency

Typical bandwidth:

* PCIe Gen3 x16 ≈ 16 GB/s
* PCIe Gen4 x16 ≈ 32 GB/s

Usage example:

```
cudaMemcpy(d_a, h_a, size, cudaMemcpyHostToDevice);
```

**6.1.2 NVLink**

NVLink is NVIDIA’s high-speed GPU interconnect designed for GPU-to-GPU communication.

Key advantages:

* Much higher bandwidth than PCIe
* Lower latency
* Direct GPU-to-GPU data transfer

Typical bandwidth:

* Up to 300 GB/s (generation dependent)

Use cases:

* Large deep learning models
* Multi-GPU scientific simulations
* Distributed memory workloads

### 6.2 Memory Transfer in Multi-GPU Systems

Data transfer types:

* Host → Device
* Device → Host
* Device → Device

Device-to-Device transfer:

```
cudaMemcpy(d_b, d_a, size, cudaMemcpyDeviceToDevice);
```

Optimizations:

* Minimize host-device transfers
* Keep data on GPU as long as possible
* Use asynchronous copies with streams

### 6.3 Multi-GPU Programming Basics

Selecting a GPU

CUDA allows selecting a specific GPU in multi-GPU systems.

`cudaSetDevice(device_id);`

Example:

`cudaSetDevice(0); // Use GPU 0`

Each GPU:

* Has its own memory
* Executes kernels independently

Basic Multi-GPU Workflow

1. Detect number of GPUs
2. Divide data across GPUs
3. Launch kernels on each GPU
4. Collect results

Detect GPUs:

`int count; cudaGetDeviceCount(&count);`

### 6.4 Peer-to-Peer (P2P) Communication

**What is Peer-to-Peer Communication?**

P2P allows one GPU to directly access memory of another GPU without CPU involvement.

Benefits:

* Faster data transfer
* Lower latency
* Reduced CPU overhead

Enable P2P Access

Check P2P capability:

`int canAccess; cudaDeviceCanAccessPeer(&canAccess, dev1, dev2);`

Enable P2P:

`cudaDeviceEnablePeerAccess(dev2, 0);`

Peer-to-Peer Memory Copy

`cudaMemcpyPeer(d_b, dev2, d_a, dev1, size);`

Use cases:

* Multi-GPU deep learning training
* Large-scale molecular simulations
* Domain decomposition in CFD

## 7. Practical CUDA Programming

This module focuses on hands-on CUDA programming, compilation, execution, and debugging of GPU applications. It introduces basic CUDA programs in C/C++ and Python, enabling learners to run and test GPU code in real environments.

### 7.1 Vector Addition (C/C++)

Lab Steps:

1. Create vector\_add.cu

2. Write this code:

```
#include <stdio.h>
#include <cuda.h>

__global__ void vectorAdd(int *a, int *b, int *c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n)
        c[idx] = a[idx] + b[idx];
}

int main() {
    int n = 1000;
    int size = n * sizeof(int);

    int *h_a, *h_b, *h_c;
    int *d_a, *d_b, *d_c;

    // Allocate host memory
    h_a = (int *)malloc(size);
    h_b = (int *)malloc(size);
    h_c = (int *)malloc(size);

    // Initialize input vectors
    for (int i = 0; i < n; i++) {
        h_a[i] = i;
        h_b[i] = i * 2;
    }

    // Allocate device memory
    cudaMalloc((void **)&d_a, size);
    cudaMalloc((void **)&d_b, size);
    cudaMalloc((void **)&d_c, size);

    // Copy data from host to device
    cudaMemcpy(d_a, h_a, size, cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, h_b, size, cudaMemcpyHostToDevice);

    // Kernel launch configuration
    int threads = 256;
    int blocks = (n + threads - 1) / threads;

    // Launch kernel
    vectorAdd<<<blocks, threads>>>(d_a, d_b, d_c, n);

    // Copy result back to host
    cudaMemcpy(h_c, d_c, size, cudaMemcpyDeviceToHost);

    // Print sample output
    printf("Vector Addition Result (first 10 elements):\n");
    for (int i = 0; i < 10; i++)
        printf("%d ", h_c[i]);

    // Free memory
    cudaFree(d_a);
    cudaFree(d_b);
    cudaFree(d_c);
    free(h_a);
    free(h_b);
    free(h_c);

    return 0;
}
```

3. Compile & Run:

`nvcc vector_add.cu -o vector_add  
./vector_add`

### 7.2 Matrix Addition (C/C++)

Lab Steps:

1. Create matrix\_add.cu

2. Code:

```
#include <stdio.h>
#include <cuda.h>

__global__ void matrixAdd(float *A, float *B, float *C, int N) {
    int row = blockIdx.y * blockDim.y + threadIdx.y;
    int col = blockIdx.x * blockDim.x + threadIdx.x;

    if (row < N && col < N)
        C[row * N + col] = A[row * N + col] + B[row * N + col];
}

int main() {
    int N = 16;
    int size = N * N * sizeof(float);

    float *h_A, *h_B, *h_C;
    float *d_A, *d_B, *d_C;

    // Allocate host memory
    h_A = (float *)malloc(size);
    h_B = (float *)malloc(size);
    h_C = (float *)malloc(size);

    // Initialize matrices
    for (int i = 0; i < N * N; i++) {
        h_A[i] = 1.0;
        h_B[i] = 2.0;
    }

    // Allocate device memory
    cudaMalloc((void **)&d_A, size);
    cudaMalloc((void **)&d_B, size);
    cudaMalloc((void **)&d_C, size);

    // Copy data to device
    cudaMemcpy(d_A, h_A, size, cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, size, cudaMemcpyHostToDevice);

    // Kernel configuration
    dim3 threads(16, 16);
    dim3 blocks((N + 15) / 16, (N + 15) / 16);

    // Launch kernel
    matrixAdd<<<blocks, threads>>>(d_A, d_B, d_C, N);

    // Copy result back
    cudaMemcpy(h_C, d_C, size, cudaMemcpyDeviceToHost);

    // Print result
    printf("Matrix Addition Result:\n");
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++)
            printf("%.1f ", h_C[i * N + j]);
        printf("\n");
    }

    // Free memory
    cudaFree(d_A);
    cudaFree(d_B);
    cudaFree(d_C);
    free(h_A);
    free(h_B);
    free(h_C);

    return 0;
}
```

### 3. Compile & Run:

`nvcc matrix_add.cu -o matrix_add  
./matrix_add`

### 7.3 Python CUDA with Numba

Lab Steps:

1. Install packages:

`pip install numba numpy`

2. Code (`vector_add_numba.py`):

```
from numba import cuda
import numpy as np

# CUDA Kernel
@cuda.jit
def add_kernel(a, b, c):
    idx = cuda.grid(1)
    if idx < a.size:
        c[idx] = a[idx] + b[idx]

def main():
    n = 1000

    # Host arrays
    a = np.ones(n, dtype=np.float32)
    b = np.ones(n, dtype=np.float32)
    c = np.zeros(n, dtype=np.float32)

    # Copy to device
    d_a = cuda.to_device(a)
    d_b = cuda.to_device(b)
    d_c = cuda.device_array(n, dtype=np.float32)

    # Kernel configuration
    threads_per_block = 256
    blocks_per_grid = (n + threads_per_block - 1) // threads_per_block

    # Launch kernel
    add_kernel[blocks_per_grid, threads_per_block](d_a, d_b, d_c)

    # Copy result back to host
    c = d_c.copy_to_host()

    # Output
    print("Vector Addition Result (first 10 elements):")
    print(c[:10])

if __name__ == "__main__":
    main()
```

3. Run:

`python vector_add_numba.py`

