import R from 'ramda'
import types from 'constants/actionTypes'
import { checkAllWorks } from 'utils/helpers'

const initialState = {
  menuList: [
    {
      itemName: 'PHOTO SHOOT',
      isOpenedMenuItemWorks: false,
      orderWorks: [
        {
          idWork: 0,
          imagePath: 'photo-icon/photo-icon.png',
          name: 'photo_name.png',
          size: '55.0mb',
          kind: 'MLS'
        },
        {
          idWork: 1,
          imagePath: 'photo-icon/photo-icon.png',
          name: 'photo_name.png',
          size: '55.0mb',
          kind: 'PRINT'
        },
        {
          idWork: 2,
          imagePath: 'photo-icon/photo-icon-2.png',
          name: 'photo_name.png',
          size: '55.0mb',
          kind: 'MLS'
        },
        {
          idWork: 3,
          imagePath: 'photo-icon/photo-icon-2.png',
          name: 'photo_name.png',
          size: '55.0mb',
          kind: 'MLS'
        },
        {
          idWork: 4,
          imagePath: 'photo-icon/photo-icon-2.png',
          name: 'photo_name.png',
          size: '55.0mb',
          kind: 'MLS'
        }, {
          idWork: 5,
          imagePath: 'photo-icon/photo-icon-2.png',
          name: 'photo_name.png',
          size: '55.0mb',
          kind: 'MLS'
        },
        {
          idWork: 6,
          imagePath: 'photo-icon/photo-icon-2.png',
          name: 'photo_name.png',
          size: '55.0mb',
          kind: 'MLS'
        }
      ]
    },
    {
      itemName: 'VIDEO',
      isOpenedMenuItemWorks: false,
      orderWorks: [
        {
          idWork: 0,
          imagePath: 'photo-icon/photo-icon-3.png',
          name: 'video_name.mp4',
          size: '55.0mb',
          kind: 'MP4',
          workPath: 'https://www.youtube.com/embed/wpu3S47Z9a4'
        }
      ]
    },
    {
      itemName: '3D SHOWCASE',
      isOpenedMenuItemWorks: false,
      orderWorks: [
        {
          idWork: 0,
          imagePath: 'photo-icon/photo-icon-4.png',
          name: 'photo_name.png',
          size: '55.0mb',
          kind: 'MLS',
          workPath: 'https://www.youtube.com/embed/wpu3S47Z9a4'
        }
      ]
    }
  ]
}

export default function downloadMenu(state = initialState, action = {}) {
  const { type } = action
  switch (type) {
    case types.SHOW_MENU_ITEM_WORKS:
      return {
        menuList: state.menuList.map(item => (
          R.merge(item, { isOpenedMenuItemWorks: (action.payload === item.itemName && !item.isOpenedMenuItemWorks) ||
            (item.isOpenedMenuItemWorks && action.payload !== item.itemName)
          })
        ))
      }
    case types.SHOW_DOWNLOAD_BLOCK:
      return {
        menuList: state.menuList.map(item => (
          R.merge(item, { isOpenedDownloadBlock: action.payload === item.itemName && !item.isOpenedDownloadBlock })
        ))
      }
    case types.CLOSE_DOWNLOAD_BLOCK:
      return {
        menuList: state.menuList.map(item => R.merge(item, { isOpenedDownloadBlock: false }))
      }
    case types.SELECT_ORDERS_WORK:
      return {
        menuList: state.menuList.map(item => ({
          itemName: item.itemName,
          isOpenedMenuItemWorks: item.isOpenedMenuItemWorks,
          isSelectedAllWorks: item.orderWorks.every(work => checkAllWorks(work, action, item)),
          orderWorks: item.orderWorks.map(work => (
            R.merge(work, {
              isSelectedWork: checkAllWorks(work, action, item)
            })
          ))
        }))
      }
    case types.SELECT_ALL_ORDERS_WORK_OF_MENU_ITEM:
      return {
        menuList: state.menuList.map(item => ({
          itemName: item.itemName,
          isOpenedMenuItemWorks: item.isOpenedMenuItemWorks,
          isSelectedAllWorks: (action.payload === item.itemName && !item.isSelectedAllWorks) ||
            (action.payload !== item.itemName && item.isSelectedAllWorks),
          orderWorks: item.orderWorks.map(work => (
            R.merge(work, {
              isSelectedWork: (action.payload === item.itemName && !item.isSelectedAllWorks) ||
                (action.payload !== item.itemName && work.isSelectedWork)
            })
          ))
        }))
      }
    default:
      return state
  }
}
