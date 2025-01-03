# DSM-Filestation-demo

This project is a demonstration of a FileStation-style file management system UI built with React and Redux, using Next.js and various UI components.

## Plugins and Libraries Used

1. **Next.js** (v13.4.7): React framework for building server-side rendered and static web applications.
2. **React** (v18.2.0): JavaScript library for building user interfaces.
3. **Redux** (v4.2.1): State management library for JavaScript apps.
4. **@reduxjs/toolkit** (v1.9.5): The official, opinionated, batteries-included toolset for efficient Redux development.
5. **react-redux** (v8.1.1): Official React bindings for Redux.
6. **Tailwind CSS** (v3.3.2): A utility-first CSS framework.
7. **shadcn/ui** (v0.3.0): A collection of re-usable components built using Radix UI and Tailwind CSS.
8. **Lucide React** (v0.252.0): A library of crisp, pixel-perfect icons.
9. **react-rnd** (v10.4.1): A resizable and draggable component for React.
10. **next/font** (v13.4.7): Built-in font optimization for Next.js.
11. **next/image** (v13.4.7): Image component and optimizer built into Next.js.

## Key Components

- **FileManager**: Main component for file management interface.
- **ControlPanel**: Component for system control panel.
- **DesktopIcons**: Component for desktop-style icons.
- **PropertiesPortal**: Component for displaying file/folder properties.

## State Management

The application uses Redux for state management. The main slices are:

- **fileManagerSlice**: Manages state related to the file manager.
- **controlPanelSlice**: Manages state related to the control panel.

### Right-Click Menu State Management

The right-click (context) menu state is managed within the `fileManagerSlice`. It includes the following state properties:

- `showContextMenu`: Boolean to control the visibility of the context menu.
- `contextMenuPosition`: Object containing x and y coordinates for positioning the menu.
- `contextMenuItems`: Array of menu items to be displayed.

The state is updated using Redux actions when a right-click event occurs on a file or folder item.

### 属性框架的实现

点击 FileManager 菜单项下的"属性"会生成一个新框架。这个新框架使用 React 的 createPortal 功能将其渲染到指定的 DOM 节点中，确保框架独立于父级组件。框架内容如图 image.png 所示。我们使用 react-contextmenu 来辅助框架的生成。

### 嵌套框架的状态管理

对于设计更多的嵌套框架，我们可以采用以下方法来管理状态和框架之间的关系：

1. 状态管理层次化：
   - 使用 Redux 的嵌套 reducers 来管理不同层级的状态。
   - 为每个框架创建一个唯一的 reducer，负责管理该框架的状态。
   - 使用 combineReducers 函数来组合这些 reducers，形成一个层次化的状态树。

2. 框架标识：
   - 为每个框架分配一个唯一的 ID，可以使用 UUID 库生成。
   - 在状态中使用这个 ID 作为 key 来存储和访问框架的相关信息。

3. 父子框架关系：
   - 在父框架的状态中维护一个子框架 ID 的数组。
   - 子框架可以存储父框架的 ID 作为引用。

4. 路由设计：
   - 使用嵌套路由来反映框架的层次结构。
   - 每个框架对应一个路由，子框架的路由嵌套在父框架的路由之下。
   - 使用 URL 参数来传递框架 ID 和其他必要的信息。

示例状态结构：

\`\`\`javascript
{
  frameworks: {
    'framework-1': {
      id: 'framework-1',
      type: 'fileManager',
      childFrameworks: ['framework-2', 'framework-3'],
      // 其他框架特定状态
    },
    'framework-2': {
      id: 'framework-2',
      type: 'properties',
      parentFramework: 'framework-1',
      // 其他框架特定状态
    },
    'framework-3': {
      id: 'framework-3',
      type: 'subMenu',
      parentFramework: 'framework-1',
      // 其他框架特定状态
    }
  }
}
\`\`\`

示例路由结构：

\`\`\`javascript
<Route path="/file-manager/:frameworkId" element={<FileManager />}>
  <Route path="properties/:propertiesId" element={<Properties />} />
  <Route path="sub-menu/:subMenuId" element={<SubMenu />} />
</Route>
\`\`\`

通过这种方式，我们可以实现框架的独立性和层次化管理，同时保持状态的清晰和可维护性。关闭子框架时，我们只需要从父框架的 childFrameworks 数组中移除相应的 ID，并删除该子框架的状态，而不会影响其他框架的状态。


## Environment Versions

- Node.js: v18.16.0
- npm: v9.5.1
- TypeScript: v5.1.3
- shadcn/ui: v0.3.0

## Getting Started

To run this project locally:

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Installing Dependencies with Taobao NPM Mirror

To use the Taobao NPM mirror for faster package installation in China, use the following command:

\`\`\`bash
npm install --registry=https://registry.npm.taobao.org
\`\`\`

## Deployment to ECS (Elastic Compute Service)

Follow these steps to deploy the application to an ECS instance:

1. Connect to your ECS instance via SSH:
   \`\`\`bash
   ssh user@your-ecs-ip-address
   # 连接到您的ECS实例
   \`\`\`

2. Install Node.js and npm (if not already installed):
   \`\`\`bash
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   # 安装Node.js和npm
   \`\`\`

3. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/DSM-Filestation-demo.git
   cd DSM-Filestation-demo
   # 克隆项目仓库并进入项目目录
   \`\`\`

4. Install dependencies:
   \`\`\`bash
   npm install --registry=https://registry.npm.taobao.org
   # 使用淘宝NPM镜像安装依赖
   \`\`\`

5. Build the application:
   \`\`\`bash
   npm run build
   # 构建应用
   \`\`\`

6. Install PM2 for process management:
   \`\`\`bash
   sudo npm install -g pm2
   # 安装PM2进程管理工具
   \`\`\`

7. Start the application with PM2:
   \`\`\`bash
   pm2 start npm --name "dsm-filestation" -- start
   # 使用PM2启动应用
   \`\`\`

8. Configure Nginx as a reverse proxy (assuming Nginx is installed):
   \`\`\`bash
   sudo nano /etc/nginx/sites-available/dsm-filestation
   # 创建Nginx配置文件
   \`\`\`

   Add the following configuration:
   \`\`\`nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

9. Enable the Nginx configuration:
   \`\`\`bash
   sudo ln -s /etc/nginx/sites-available/dsm-filestation /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   # 启用Nginx配置并重启Nginx服务
   \`\`\`

Your application should now be accessible at `http://your-domain.com`.

## Synchronizing the Project to GitHub

Follow these steps to synchronize your local project with GitHub:

1. Create a new repository on GitHub (without initializing with README, license, or .gitignore files).

2. Initialize the local repository:
   \`\`\`bash
   git init
   # 初始化本地Git仓库
   \`\`\`

3. Add all files to the local repository:
   \`\`\`bash
   git add .
   # 添加所有文件到Git暂存区
   \`\`\`

4. Commit the files:
   \`\`\`bash
   git commit -m "Initial commit"
   # 提交更改，附带信息"Initial commit"
   \`\`\`

5. Add the GitHub repository as a remote:
   \`\`\`bash
   git remote add origin https://github.com/your-username/DSM-Filestation-demo.git
   # 添加GitHub仓库作为远程仓库
   \`\`\`

6. Push the changes to GitHub:
   \`\`\`bash
   git push -u origin main
   # 将本地更改推送到GitHub的main分支
   \`\`\`

7. For subsequent updates, use:
   \`\`\`bash
   git add .
   git commit -m "Update message"
   git push
   # 添加更改，提交，并推送到GitHub
   \`\`\`

Remember to replace `your-username` with your actual GitHub username in the remote URL.


## GitHub Repository

You can find the source code for this project at:
[https://github.com/your-username/DSM-Filestation-demo](https://github.com/your-username/DSM-Filestation-demo)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

