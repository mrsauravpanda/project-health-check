# project-health-check

> 🔍 A **CI‑friendly CLI tool** to audit **JavaScript & TypeScript project health** using real‑world quality checks.

`project-health-check` helps developers and teams quickly identify common issues in repositories — missing documentation, outdated or unused dependencies, weak scripts, and more — **before they reach production**.

---

## ✨ Why project-health-check?

Modern projects fail not because of code alone, but because of **poor project hygiene**.

This tool acts like an **automated reviewer** that checks whether a repository is:

* Maintainable
* CI‑ready
* Dependency‑safe
* Professionally structured

Perfect for:

* Individual developers
* Open‑source maintainers
* Teams enforcing repo standards
* CI pipelines

---

## 🚀 Installation

### Run instantly (recommended)

```bash
npx project-health-check
```

### Install globally

```bash
npm install -g project-health-check
project-health-check
```

---

## 🖥 Usage

```bash
project-health-check
```

### CI mode (non‑zero exit on failure)

```bash
project-health-check --ci
```

---

## ✅ Health Checks Performed

### 📄 Repository Structure

* ✔ README present
* ✔ LICENSE present
* ⚠ `.gitignore` present

### 🧪 Testing Setup

* ✔ Detects `test` script in `package.json`

### 📦 Dependency Analysis

* ✔ Outdated dependencies (`npm outdated`)
* ✔ Unused dependencies (via `depcheck`)

### 📁 File System Hygiene

* ✔ Detects large files (> 5MB)

### ⚙ Script Quality

* ✔ Ensures important scripts exist (`build`, `test`)

---

## 📊 Scoring System

Each rule has a **weight**, and results are normalized into a **0–100 health score**.

| Status | Impact        |
| ------ | ------------- |
| Pass   | Full score    |
| Warn   | Partial score |
| Fail   | No score      |

Example output:

```text
✔ README present
✔ LICENSE present
⚠ 2 outdated dependencies
✖ Unused dependencies detected

Health Score: 78/100
```

---

## 🤖 CI‑Friendly by Design

When run with `--ci`:

* No interactive spinners
* Deterministic output
* Exit code `1` if score < 80

Perfect for GitHub Actions, GitLab CI, or Jenkins.

---

## 🧠 Technical Highlights

* Written in **TypeScript**
* Node.js **>= 18**
* ESM‑only
* Modular rule engine
* Weighted scoring system
* Safe dependency analysis

---

## 🧩 Architecture Overview

```text
src/
├── checks/        # Individual health rules
├── core/          # Rule runner & scoring
├── cli/           # CLI logic
├── utils/         # Helpers (fs, exec)
├── reporters/     # Output formats
└── types/         # Shared types
```

Each check is isolated and easily extendable.

---

## 🛣 Roadmap

* 🔧 Config file support (`.healthcheckrc`)
* 📄 JSON / Markdown report export
* 🔄 Recursive large‑file scanning
* 🧪 Deeper test framework detection
* 🐙 GitHub Action template

---

## 👨‍💻 Ideal Use Cases

* Pre‑merge quality gates
* Auditing open‑source repos
* Improving legacy projects
* Portfolio demonstration of tooling skills

---

## 📄 License

MIT © 2025

---

## ⭐ If You Like This Tool

* Give it a star ⭐ on GitHub
* Use it in CI
* Suggest new rules via issues

---

> Built to encourage **healthy, maintainable JavaScript projects**.