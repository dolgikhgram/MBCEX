import s from "./Header.module.css";
import CryptoDisplay from "./CryptoDisplay/ui/CryptoDisplay.tsx";
import { openTelegramChannel, openTelegramSupport, scrollToSection } from "../../utils/header.ts";
import { useState } from "react";
import Modal from "../Modal/Modal.tsx";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    };

    const onOpen = () => {
        setIsOpen(true);
    };

    const handleMenuItemClick = (action: () => void) => {
        action();
        setIsOpen(false);
    };

    return (
        <div className={s.container}>
            <div className={s.contentContainer}>
                <img className={s.logo} src={`${import.meta.env.BASE_URL}header/MBCEX.svg`} alt="logo" />
                <div className={s.sectionsContainer}>
                    <div className={s.section} onClick={() => scrollToSection("about")}>
                        О проекте
                    </div>
                    <div className={s.section} onClick={() => scrollToSection("exchange")}>
                        Как совершить обмен
                    </div>
                    <div className={s.section} onClick={() => scrollToSection("reviews")}>
                        Отзывы
                    </div>
                    <div className={s.section}>
                        <div className={s.sectionContainer} onClick={() => openTelegramChannel()}>
                            <div>Канал</div>
                            <img
                                className={s.telegramIcon}
                                src={`${import.meta.env.BASE_URL}header/telegram.svg`}
                                alt="telegram"
                            />
                            <img
                                className={s.telegramIconGold}
                                src={`${import.meta.env.BASE_URL}header/telegramGold.svg`}
                                alt="telegram gold"
                            />
                        </div>
                    </div>
                    <div className={s.section}>
                        <div className={s.sectionContainer} onClick={() => openTelegramSupport()}>
                            <div>Оставить заявку</div>
                            <img
                                className={s.telegramIcon}
                                src={`${import.meta.env.BASE_URL}header/telegram.svg`}
                                alt="telegram"
                            />
                            <img
                                className={s.telegramIconGold}
                                src={`${import.meta.env.BASE_URL}header/telegramGold.svg`}
                                alt="telegram gold"
                            />
                        </div>
                    </div>
                </div>
                <img
                    className={s.menu}
                    src={`${import.meta.env.BASE_URL}header/menu.svg`}
                    alt="menu"
                    onClick={onOpen}
                />
                <Modal onClose={onClose} isOpen={isOpen} title={"Меню"}>
                    <div className={s.menuItems}>
                        <div className={s.menuItem} onClick={() => handleMenuItemClick(() => scrollToSection("about"))}>
                            О проекте
                        </div>
                        <div
                            className={s.menuItem}
                            onClick={() => handleMenuItemClick(() => scrollToSection("exchange"))}
                        >
                            Как совершить обмен
                        </div>
                        <div
                            className={s.menuItem}
                            onClick={() => handleMenuItemClick(() => scrollToSection("reviews"))}
                        >
                            Отзывы
                        </div>
                        <div className={s.menuItem}>
                            <div
                                className={s.menuItemContainer}
                                onClick={() => handleMenuItemClick(openTelegramChannel)}
                            >
                                <div>Канал</div>
                                <img
                                    className={s.telegramIcon}
                                    src={`${import.meta.env.BASE_URL}header/telegram.svg`}
                                    alt="telegram"
                                />
                                <img
                                    className={s.telegramIconGold}
                                    src={`${import.meta.env.BASE_URL}header/telegramGold.svg`}
                                    alt="telegram gold"
                                />
                            </div>
                        </div>
                        <div className={s.menuItem}>
                            <div
                                className={s.menuItemContainer}
                                onClick={() => handleMenuItemClick(openTelegramSupport)}
                            >
                                <div>Оставить заявку</div>
                                <img
                                    className={s.telegramIcon}
                                    src={`${import.meta.env.BASE_URL}header/telegram.svg`}
                                    alt="telegram"
                                />
                                <img
                                    className={s.telegramIconGold}
                                    src={`${import.meta.env.BASE_URL}header/telegramGold.svg`}
                                    alt="telegram gold"
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <CryptoDisplay />
        </div>
    );
};

export default Header;
