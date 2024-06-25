import type { ChartItem } from '@/types/chartItem'

interface ChartDataList {
  [key: string]: ChartItem[]
}

export const skillData = <ChartDataList>{
  // 方向
  direction: [
    {
      name: '前端',
      val: 'web',
      icon: 'https://api.iconify.design/vscode-icons:file-type-html.svg',
    },
    {
      name: '后端',
      val: 'backend',
      icon: 'https://api.iconify.design/vscode-icons:file-type-apib.svg',
    },
    {
      name: 'IOS',
      val: 'ios',
      icon: 'https://api.iconify.design/vscode-icons:file-type-applescript.svg',
    },
    {
      name: 'APP',
      val: 'app',
      icon: 'https://api.iconify.design/vscode-icons:file-type-appsemble.svg',
    },
  ],
  // 语言
  language: [
    {
      name: 'JavaScript',
      target: ['Vue', 'Nuxt', '前端', '后端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-js-official.svg',
    },
    {
      name: 'TypeScript',
      target: ['Vue', 'Nuxt', '前端', '后端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-tsconfig.svg',
    },
    {
      name: 'Python',
      icon: 'https://api.iconify.design/vscode-icons:file-type-python.svg',
    },
    {
      name: 'CSS',
      target: ['Vue', 'Nuxt', '前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-css.svg',
    },
    {
      name: 'HTML',
      target: ['Vue', 'Nuxt', '前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-html.svg',
    },
    {
      name: 'C',
      target: ['APP'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-c.svg',
    },
    {
      name: 'Lua',
      icon: 'https://api.iconify.design/vscode-icons:file-type-lua.svg',
    },
    {
      name: 'C++',
      target: ['APP'],
      icon: '',
    },
    {
      name: 'Swift',
      target: ['IOS', 'APP'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-swift.svg',
    },
    {
      name: 'Objective-C',
      target: ['IOS', 'APP'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-objectivec.svg',
    },
    {
      name: 'PHP',
      target: ['后端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-php.svg',
    },
  ],
  // 框架
  frame: [
    {
      name: 'Vue',
      target: ['前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-vue.svg',
    },
    {
      name: 'Nuxt',
      target: ['前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-nuxt.svg',
    },
    {
      name: 'Electron',
      target: ['前端', 'APP'],
      icon: 'https://api.iconify.design/vscode-icons:folder-type-electron.svg',
    },
    {
      name: 'Tauri',
      target: ['前端', 'APP'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-tauri.svg',
    },
    {
      name: 'Vite',
      target: ['前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-vite.svg',
    },
    {
      name: 'Unocss',
      target: ['前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-unocss.svg',
    },
    {
      name: 'Webpack',
      target: ['前端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-webpack.svg',
    },
    {
      name: 'Nestjs',
      target: ['后端'],
      icon: 'https://api.iconify.design/vscode-icons:file-type-nestjs.svg',
    },
  ],
}

function handleChartData() {
  const seriesData: any[] = []
  const baseDataList: any[] = []
  Object.keys(skillData).forEach((key) => {
    skillData[key].forEach((item: any) => {
      seriesData.push({
        name: item.name,
        draggable: true,
        symbol: item.icon ? `image://${item.icon}` : 'circle',
        label: {
          position: 'bottom',
        },
      })
      baseDataList.push(item)
    })
  })
  return {
    seriesData,
    baseDataList,
  }
}

function handleChartLinks(baseDataList: any) {
  const tempLinksList: any[] = []
  baseDataList.forEach((item: any) => {
    if (item.target) {
      item.target.forEach((target: any) => {
        tempLinksList.push({
          source: item.name,
          target,
          value: '',
        })
      })
    }
  })
  return tempLinksList
}

export function getChartData() {
  const { seriesData, baseDataList } = handleChartData()
  const linksList = handleChartLinks(baseDataList)
  return {
    seriesData,
    linksList,
  }
}
