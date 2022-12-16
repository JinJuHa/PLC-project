<template>
  <div>
    <div class="app-container">
      <div class="app-content">
        <div class="app-content-header">
          <h1 class="app-content-headerText">Device list</h1>
          <b-button @click="signOut">로그아웃</b-button>
          <b-button @click="deviceAdd">디바이스 추가</b-button>
        </div>
        <div class="app-content-actions">
          <div class="app-content-actions-wrapper">
            <div class="filter-button-wrapper">
              <button class="action-button filter jsFilter"></button>
            </div>
            <button class="action-button list active" title="List View">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-list"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
            <button class="action-button grid" title="Grid View">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-grid"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>
        </div>
        <!-- 바뀌는 내용 -->
        <div class="products-area-wrapper tableView">
          <div class="products-header">
            <div class="product-cell image">PLC name</div>
            <div class="product-cell status-cell">Status</div>
          </div>
          <div v-for="edukit in edukitList.data" :key="edukit.id" class="products-row" @click="plcRoute(edukit.id)">
            <div class="product-cell image">
              <img src="../../public/img/plc.jpg" alt="product" />
              <span>PLC - {{ edukit.name }}</span>
            </div>
            <div class="product-cell status-cell">
              <span class="cell-label">Status:</span>
              <span class="status active">공정 가능</span>
            </div>
          </div>
        </div>
        <!-- 여기까지 -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      edukitList: []
    }
  },
  mounted() {
    document.querySelector('.grid').addEventListener('click', function () {
      document.querySelector('.list').classList.remove('active')
      document.querySelector('.grid').classList.add('active')
      document.querySelector('.products-area-wrapper').classList.add('gridView')
      document.querySelector('.products-area-wrapper').classList.remove('tableView')
    })

    document.querySelector('.list').addEventListener('click', function () {
      document.querySelector('.list').classList.add('active')
      document.querySelector('.grid').classList.remove('active')
      document.querySelector('.products-area-wrapper').classList.remove('gridView')
      document.querySelector('.products-area-wrapper').classList.add('tableView')
    })

    this.getDevice()
  },
  methods: {
    signOut() {
      localStorage.removeItem('token')
      this.$router.push('/auth/login')
    },
    async getDevice() {
      await axios
        .get(process.env.VUE_APP_SERVER + '/manages/get-manage-list', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async res => {
          this.edukitList = res.data
          console.log('getDevice - response: ', this.edukitList)
        })
        .catch(err => {
          console.log('getDevice - error: ', err)
        })
    },
    async deviceAdd() {
      await axios
        .post(
          process.env.VUE_APP_SERVER + '/devices/insert',
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        .then(async res => {
          const code = res.data
          console.log('/deviceAdd - response: ', code)
          alert('디바이스가 추가 되었습니다.')
          this.getDevice()
        })
        .catch(err => {
          console.log('/deviceAdd - error: ', err)
          alert('디바이스를 추가할 권한이 없습니다.')
        })
    },
    plcRoute(edukitId) {
      this.$router.push(`/web/${edukitId}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap');

:root {
  --app-bg: #101827;
  --sidebar: rgba(21, 30, 47, 1);
  --sidebar-main-color: #fff;
  --table-border: #1a2131;
  --table-header: #1a2131;
  --app-content-main-color: #fff;
  --sidebar-link: #fff;
  --sidebar-active-link: #1d283c;
  --sidebar-hover-link: #1a2539;
  --action-color: #2869ff;
  --action-color-: #6291fd;
  --app-content-secondary-color: #1d283c;
  --filter-reset: #2c394f;
  --filter-shadow: rgba(16, 24, 39, 0.8) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.light:root {
  --app-bg: #fff;
  --sidebar: #f3f6fd;
  --app-content-secondary-color: #f3f6fd;
  --app-content-main-color: #1f1c2e;
  --sidebar-link: #1f1c2e;
  --sidebar-hover-link: rgba(195, 207, 244, 0.5);
  --sidebar-active-link: rgba(195, 207, 244, 1);
  --sidebar-main-color: #1f1c2e;
  --filter-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

$font-small: 14px;
$font-medium: 16px;
$font-large: 24px;

.app-container {
  border-radius: 4px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 1280px;
  display: flex;
  overflow: hidden;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  max-width: 2000px;
  margin: 0 auto;
}

.mode-switch.active .moon {
  fill: none;
}

.account-info {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-top: auto;

  &-picture {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-name {
    font-size: $font-small;
    color: var(--sidebar-main-color);
    margin: 0 8px;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-more {
    color: var(--sidebar-main-color);
    padding: 0;
    border: none;
    background-color: transparent;
    margin-left: auto;
  }
}

.app-icon {
  color: var(--sidebar-main-color);

  svg {
    width: 24px;
    height: 24px;
  }
}

.app-content {
  padding: 50px;
  background-color: var(--app-bg);
  height: 100%;
  flex: 1;
  max-height: 100%;
  display: flex;
  flex-direction: column;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
  }

  &-headerText {
    color: var(--app-content-main-color);
    font-size: $font-large;
    line-height: 32px;
    margin: 0;
  }

  &-headerButton {
    background-color: var(--action-color);
    color: #fff;
    font-size: $font-small;
    line-height: 24px;
    border: none;
    border-radius: 4px;
    height: 32px;
    padding: 0 16px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: var(--action-color-hover);
    }
  }

  &-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 4px;

    &-wrapper {
      display: flex;
      align-items: center;
      margin-left: auto;
    }

    @media screen and (max-width: 520px) {
      & {
        flex-direction: column;

        .search-bar {
          max-width: 100%;
          order: 2;
        }
        .app-content-actions-wrapper {
          padding-bottom: 16px;
          order: 1;
        }
      }
    }
  }
}

@mixin searchIcon($color) {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23#{$color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-search'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E");
}

.search-bar {
  background-color: var(--app-content-secondary-color);
  border: 1px solid var(--app-content-secondary-color);
  color: var(--app-content-main-color);
  font-size: $font-small;
  line-height: 24px;
  border-radius: 4px;
  padding: 0px 10px 0px 32px;
  height: 32px;
  @include searchIcon('fff');
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: left 10px center;
  width: 100%;
  max-width: 320px;
  transition: 0.2s;

  .light & {
    @include searchIcon('1f1c2e');
  }

  &:placeholder {
    color: var(--app-content-main-color);
  }

  &:hover {
    border-color: var(--action-color-hover);
    @include searchIcon('6291fd');
  }

  &:focus {
    outline: none;
    border-color: var(--action-color);
    @include searchIcon('2869ff');
  }
}

.action-button {
  border-radius: 4px;
  height: 32px;
  background-color: var(--app-content-secondary-color);
  border: 1px solid var(--app-content-secondary-color);
  display: flex;
  align-items: center;
  color: var(--app-content-main-color);
  font-size: $font-small;
  margin-left: 8px;
  cursor: pointer;

  span {
    margin-right: 4px;
  }

  &:hover {
    border-color: var(--action-color-hover);
  }

  &:focus,
  &.active {
    outline: none;
    color: var(--action-color);
    border-color: var(--action-color);
  }
}

.filter-button-wrapper {
  position: relative;
}

@mixin arrowDown($color) {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23#{$color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
}

.filter-menu {
  background-color: var(--app-content-secondary-color);
  position: absolute;
  top: calc(100% + 16px);
  right: -74px;
  border-radius: 4px;
  padding: 8px;
  width: 220px;
  z-index: 2;
  box-shadow: var(--filter-shadow);

  visibility: hidden;
  opacity: 0;
  transition: 0.2s;

  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-bottom: 5px solid var(--app-content-secondary-color);
    bottom: 100%;
    left: 50%;
    transform: translatex(-50%);
  }

  &.active {
    visibility: visible;
    opacity: 1;
    top: calc(100% + 8px);
  }

  label {
    display: block;
    font-size: $font-small;
    color: var(--app-content-main-color);
    margin-bottom: 8px;
  }

  select {
    appearance: none;
    @include arrowDown('fff');
    background-repeat: no-repeat;
    padding: 8px 24px 8px 8px;
    background-position: right 4px center;
    border: 1px solid var(--app-content-main-color);
    border-radius: 4px;
    color: var(--app-content-main-color);
    font-size: 12px;
    background-color: transparent;
    margin-bottom: 16px;
    width: 100%;
    option {
      font-size: 14px;
    }

    .light & {
      @include arrowDown('1f1c2e');
    }

    &:hover {
      border-color: var(--action-color-hover);
    }

    &:focus,
    &.active {
      outline: none;
      color: var(--action-color);
      border-color: var(--action-color);
      @include arrowDown('2869ff');
    }
  }
}

.filter-menu-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-button {
  border-radius: 2px;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
  border: none;
  color: #fff;

  &.apply {
    background-color: var(--action-color);
  }

  &.reset {
    background-color: var(--filter-reset);
  }
}

.products-area-wrapper {
  width: 100%;
  max-height: 100%;
  overflow: auto;
  padding: 0 4px;
}

.tableView {
  .products-header {
    display: flex;
    align-items: center;
    border-radius: 4px;
    background-color: var(--app-content-secondary-color);
    position: sticky;
    top: 0;
  }

  .products-row {
    display: flex;
    align-items: center;
    border-radius: 4px;

    &:hover {
      box-shadow: var(--filter-shadow);
      background-color: rgba(202, 202, 202, 0.182);
      cursor: pointer;
    }

    .cell-more-button {
      display: none;
    }
  }

  .product-cell {
    flex: 1;
    padding: 8px 16px;
    color: var(--app-content-main-color);
    font-size: $font-small;
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      margin-right: 6px;
    }

    @media screen and (max-width: 780px) {
      & {
        font-size: 12px;
        &.image span {
          display: none;
        }
        &.image {
          flex: 0.2;
        }
      }
    }

    @media screen and (max-width: 520px) {
      & {
        &.category,
        &.sales {
          display: none;
        }
        &.status-cell {
          flex: 0.4;
        }
        &.stock,
        &.price {
          flex: 0.2;
        }
      }
    }

    @media screen and (max-width: 480px) {
      & {
        &.stock {
          display: none;
        }
        &.price {
          flex: 0.4;
        }
      }
    }
  }

  .cell-label {
    display: none;
  }
}

.status {
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-size: 12px;

  &:before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin-right: 4px;
  }

  &.active {
    color: #2ba972;
    background-color: rgba(43, 169, 114, 0.2);

    &:before {
      background-color: #2ba972;
    }
  }

  &.disabled {
    color: #59719d;
    background-color: rgba(89, 113, 157, 0.2);

    &:before {
      background-color: #59719d;
    }
  }
}

.gridView {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;

  @media screen and (max-width: 520px) {
    & {
      margin: 0;
    }
  }

  .products-header {
    display: none;
  }

  .products-row {
    margin: 8px;
    width: calc(25% - 16px);
    background-color: var(--app-content-secondary-color);
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s;
    position: relative;

    &:hover {
      transform: scale(1.01);
      box-shadow: var(--filter-shadow);

      .cell-more-button {
        display: flex;
      }
    }

    @media screen and (max-width: 1024px) {
      & {
        width: calc(33.3% - 16px);
      }
    }

    @media screen and (max-width: 820px) {
      & {
        width: calc(50% - 16px);
      }
    }

    @media screen and (max-width: 520px) {
      & {
        width: 100%;
        margin: 8px 0;

        &:hover {
          transform: none;
        }
      }
    }

    .cell-more-button {
      border: none;
      padding: 0;
      border-radius: 4px;
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: rgba(16, 24, 39, 0.7);
      color: #fff;
      cursor: pointer;
      display: none;
    }
  }

  .product-cell {
    color: var(--app-content-main-color);
    font-size: $font-small;
    margin-bottom: 8px;

    &:not(.image) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &.image span {
      font-size: 18px;
      line-height: 24px;
    }

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 16px;
    }
  }

  .cell-label {
    opacity: 0.6;
  }
}
</style>
