# IQT-FSD-2026 Assessment Answers

This document contains professional answers to the theoretical assessment questions, with each section structured to remain concisely under 300 words.

---

## 1. How would you secure a web application?

Securing a web application requires a multi-layered, defense-in-depth security posture across both the frontend and backend architectures:

1. **Transport Layer Security**: Force HTTPS globally using TLS 1.3 to encrypt data in transit and prevent Man-in-the-Middle (MitM) attacks. Set HTTP Strict Transport Security (HSTS) headers.
2. **Authentication & Session Management**: Use industry-standard protocols like OAuth 2.0 or OpenID Connect. Store JWT tokens or session identifiers inside secure, `HttpOnly`, `SameSite=Strict` cookies to block Cross-Site Scripting (XSS) extraction.
3. **Input Validation and Output Sanitization**: Reject invalid formats at the router boundary using request validators. Sanitize all incoming payloads to prevent SQL/NoSQL Injection, and encode user inputs rendered in HTML to mitigate XSS.
4. **Security Headers**: Inject protective HTTP response headers such as Content Security Policy (CSP) to restrict scripts origin, `X-Frame-Options` to block clickjacking, and `X-Content-Type-Options` to prevent MIME-sniffing.
5. **CORS and API Safety**: Apply strict Cross-Origin Resource Sharing (CORS) rules to only whitelist authorized client domains. Setup rate limiters on public endpoints to protect against brute-force and Distributed Denial of Service (DDoS) requests.
6. **Vulnerability Patching**: Continuously scan dependency trees (e.g., `npm audit`) to identify and patch outdated libraries, and utilize secrets management vaults (e.g., AWS Secrets Manager) instead of committing credentials.

---

## 2. How would you improve React performance?

Optimizing React applications centers around decreasing initial bundle footprint, optimizing rendering cycles, and managing asset loading efficiently:

1. **Code Splitting & Lazy Loading**: Defer non-critical components and route payloads using `React.lazy()` and dynamic imports. This minimizes the initial Javascript bundle size and accelerates time-to-interactive (TTI).
2. **Preventing Unnecessary Re-renders**:
   - Memoize static components with `React.memo` to skip execution if props haven't changed.
   - Cache callback function references using `useCallback` and computationally expensive calculations using `useMemo`.
3. **State Management Structuring**: Avoid global state pollution. Keep state localized to the nearest component tree. Use React’s concurrent features like `useTransition` to separate urgent UI updates (e.g. typing) from heavy non-urgent UI transitions (e.g. rendering data grids).
4. **List Virtualization**: When displaying large lists or grids of data, avoid rendering all DOM nodes at once. Use virtual window libraries (like `react-window` or `react-virtualized`) to only mount the nodes visible in the viewport.
5. **Asset Optimization**: Use modern image formats (like WebP) combined with loading rules (lazy loading, srcsets). Leverage next-gen frameworks configurations (like Next.js `Image` and `next/font`) to prevent layout shifts and optimize font distribution.

---

## 3. SQL vs NoSQL databases

The choice between SQL (Relational) and NoSQL (Non-relational) databases hinges on data structure, transaction integrity, and scaling topologies:

### SQL Databases (Relational)
- **Data Model**: Structured tabular format (rows and columns) with pre-defined schemas and explicit foreign-key relationships.
- **Scaling**: Typically scales **vertically** (increasing CPU/RAM on a single machine), making horizontal clustering complex.
- **Transactions**: Supports strict **ACID** (Atomicity, Consistency, Isolation, Durability) properties, ensuring absolute consistency for financial and enterprise systems.
- **Best For**: Applications with highly relational data, complex queries involving nested joins, and systems requiring strict structural consistency (e.g., ERPs, transactional banking).
- **Examples**: PostgreSQL, MySQL, Microsoft SQL Server.

### NoSQL Databases (Non-Relational)
- **Data Model**: Flexible, dynamic schemas storing records as documents (JSON), key-value pairs, wide-column stores, or graphs.
- **Scaling**: Designed to scale **horizontally** (by sharding/partitioning data across cheap distributed servers).
- **Transactions**: Adheres to the **BASE** model (Basically Available, Soft state, Eventual consistency), sacrificing immediate consistency for high write throughput and system availability.
- **Best For**: Rapid prototyping, unstructured data feeds, content management, real-time analytics, and web applications needing scale (e.g., social feeds, task managers).
- **Examples**: MongoDB, Redis, Cassandra.

---

## 4. Deploying a full-stack application to AWS

Deploying a production-ready web application on AWS requires isolating static assets from compute layers and database clusters:

1. **Frontend Hosting**:
   - Build the Next.js frontend application.
   - Deploy static outputs to an **Amazon S3** bucket.
   - Configure **Amazon CloudFront** as a CDN in front of S3 to cache content globally, configure SSL certificates via AWS Certificate Manager (ACM), and ensure low latency.
2. **Backend Compute**:
   - Containerize the Express server using a Dockerfile.
   - Push the image to **Amazon ECR** (Elastic Container Registry).
   - Run the container within **Amazon ECS** using **AWS Fargate** for serverless container execution.
   - Attach an **Application Load Balancer (ALB)** in front of Fargate tasks to distribute incoming client requests, manage auto-scaling, and terminate SSL.
3. **Database Layer**:
   - Deploy a fully managed database using **Amazon RDS** (for SQL database structures) or use **MongoDB Atlas** (integrated into the AWS network infrastructure using VPC Peering or AWS PrivateLink for secure internal routing).
4. **CI/CD & Monitoring**:
   - Configure deployment workflows using GitHub Actions or **AWS CodePipeline** to automate testing, build Docker images, and deploy new revisions.
   - Hook in **Amazon CloudWatch** to gather application logs, metrics, and trigger container restart alerts on high CPU/memory utilization.
