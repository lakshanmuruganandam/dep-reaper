# 💀 Dep Reaper

**Execute the dead weight in your node_modules.**

We all install packages and forget about them. Over time, your `package.json` becomes bloated with unused dependencies. 

`dep-reaper` scans your entire project, identifies packages in your `package.json` that are *literally never imported in your code*, and then prompts you with a gorgeous interactive UI asking: *"Do you want to execute (uninstall) all of these dead dependencies right now?"*

## 🚀 Usage

No installation required! Just run it directly inside your project directory using `npx`:

```bash
npx dep-reaper
```

Or, install it globally:

```bash
npm install -g dep-reaper
```

Then run it in any directory:

```bash
dep-reaper
```

## 🛠️ Built With
- Node.js
- Inquirer
- Depcheck
- Picocolors

## 📜 License
MIT License. Created by @lakshanmuruganandam.


### 🧠 AI Engine & Model Architecture
This system is explicitly powered by **`deepseek-ai/deepseek-coder-33b-instruct`**.

Rather than relying on closed-source APIs, we custom-engineered this agent to leverage the specific strengths of `deepseek-ai/deepseek-coder-33b-instruct`. This allows the agent to process complex inputs with significantly lower latency and higher accuracy, ensuring enterprise-grade performance while remaining entirely open-source.
