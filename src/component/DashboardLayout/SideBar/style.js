import styled from "styled-components";

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  height: 100%;
  width: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 100;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

  &.close {
    width: 7rem;

    .logo-wrapper {
      .logo-name {
        opacity: 0;
        pointer-events: none;
        transform: scale(0.8) translateX(-9rem);
      }
    }
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem 2.5rem;

    .logo-name {
      font-size: 2.8rem;
      font-weight: 600;
      color: var(--color-text);
    }
  }

  &.close {
    .menu-item-wrapper {
      &.active {
        padding: 0 1rem;

        .menu-item {
          margin: 0 1rem;
        }
      }
    }
  }

  .menu {
    height: 100%;
    padding: 0;
    margin: 0;
    padding-bottom: 9rem;
    overflow: visible;
    padding: 0 1.7rem;
    list-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &.close {
    .menu {
      padding: 0;

      .menu-item-wrapper {
        &.active {
          .sub-menu-item {
            padding: 0;
          }
        }

        .menu-item {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;

          &__icon {
            margin-right: 0;
          }

          &__label {
            display: none;
          }

          &__notification {
            display: none;
          }
        }
      }

      .sub-menu-item {
        .icon-wrapper {
          display: none;
        }
      }

      .sub-menu {
        position: absolute;
        left: 100%;
        top: -10px;
        margin-top: 0;
        padding: 1rem 3rem 1rem 2rem;
        border-radius: 0 3px 3px 0;
        opacity: 0;
        display: block;
        pointer-events: none;
        background-color: white;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

        li {
          padding: 0.7rem 0.2rem;
        }

        &__name {
          display: block;
          font-size: 1.6rem !important;
          font-weight: 600 !important;
          opacity: 1;
          color: var(--color-text) !important;

          &.category,
          &.category:hover {
            cursor: default;
          }
        }
      }

      /* hiển thị sub menu khi hover */
      .menu-item-wrapper:hover {
        .sub-menu {
          top: 0;
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }
`;

const MenuItemWrapper = styled.li`
  position: relative;
  list-style: none;
  width: 100%;

  .menu-item__icon {
    .material-icons-outlined {
      font-size: 2.2rem;
    }
  }

  &.active {
    .menu-item {
      border-radius: 0.5rem;
      background: linear-gradient(
        118deg,
        var(--color-primary),
        var(--color-primary-light)
      );
    }

    .sub-menu-item {
      background: linear-gradient(
        118deg,
        var(--color-primary),
        var(--color-primary-light)
      );

      /* chỉ lấy màu nền của cha, không cần lấy màu nền của con */
      .menu-item {
        background: transparent;
      }
    }

    .menu-item__icon,
    .menu-item__label,
    .icon-wrapper {
      color: white !important;
    }
  }

  &:hover {
    cursor: pointer;

    .sub-menu {
      &.blank {
        top: 50% !important;
        transform: translateY(-50%);
        opacity: 1;
        pointer-events: auto;
      }
    }

    .sub-menu-item {
      .icon-wrapper {
        color: var(--color-text-secondary);
      }
    }

    .menu-item {
      .menu-item__label {
        color: var(--color-text);
      }

      .menu-item__icon {
        color: var(--color-text);
      }
    }
  }

  .menu-item.single {
    padding: 0 1rem;
  }

  .menu-item {
    display: flex;
    align-items: center;
    width: 100%;

    &__icon {
      height: 4.5rem;
      line-height: 5rem;
      color: var(--color-text);
      font-size: 2rem;
      margin-right: 1.1rem;
      display: flex;
      align-items: center;
    }

    &__label {
      color: var(--color-text);
      font-size: 1.6rem;
      font-weight: 500;
    }

    &__notification {
      margin-left: auto;
      font-size: 1.2rem;
      font-weight: 500;
      color: white;
      background-color: ${(props) =>
        props.notificationColor
          ? props.notificationColor.toString()
          : "transparent"};
      padding: 0.1rem 0.5rem;
      border-radius: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .sub-menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.5rem;
    padding: 0 1rem;

    .icon-wrapper {
      color: var(--color-text-secondary);
      display: flex;
      align-items: center;

      .material-icons-outlined {
        font-size: 1.8rem;
      }
    }
  }

  &.show-menu {
    .sub-menu {
      display: flex;
      flex-direction: column;
      border: 1px solid transparent;
    }

    .sub-menu-item {
      .icon {
        transform: rotate(-180deg);
      }
    }
  }

  .sub-menu {
    padding: 6px 6px 0 2.5rem;
    margin-top: -0.5rem;
    display: none;
    list-style: none;

    &.blank {
      opacity: 0;
      pointer-events: none;
      padding: 3px 2rem 0.6rem 1.5rem;
    }

    & > li {
      color: var(--color-text);
      font-size: 1.5rem;
      white-space: nowrap;
      font-weight: 500;
      display: flex;
      padding: 1rem 1rem;

      .menu-item__notification {
        margin-right: -1rem;
      }

      &:hover {
        color: var(--color-text);
      }
    }

    &__name {
      display: none;
    }
  }
`;

export { SidebarWrapper, MenuItemWrapper };
