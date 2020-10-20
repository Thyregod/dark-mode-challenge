import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

enum themes {
    DARK = 'dark-mode',
    LIGHT = 'light-mode'
}
const themeCookieName = "morningscore-selected-theme";

const ThemeSwitcher = () => {
    const [userSelectedTheme, setUserSelectedTheme] = useState(getSelectedTheme());
    
    const isLightTheme = userSelectedTheme === themes.LIGHT;
    
    // [] makes the useEffect similar to componentDidMount which only runs once
    useEffect(() => {
        initThemeClassOnBody()
    }, []);
    
    return (
        <button className='app__dark-mode-btn icon level-right' onClick={onThemeToggle}>
            <FontAwesomeIcon
                icon={isLightTheme ? faMoon : faSun}
                color={isLightTheme ? '#4D5B6B' : '#FFA500'} />
        </button>
    );

    function onThemeToggle(): void {
        const selectedTheme = userSelectedTheme === themes.LIGHT ? themes.DARK : themes.LIGHT;

        setUserSelectedTheme(selectedTheme);
        setUserThemeCookie(selectedTheme);
        toggleThemeClassOnBody();
    }

    function initThemeClassOnBody(): void {
        if (getSelectedTheme() !== getOsTheme()) {
            toggleThemeClassOnBody();
        }
    }

    function toggleThemeClassOnBody(): void {
        document.body.classList.toggle(getOsTheme() === themes.LIGHT ? themes.DARK : themes.LIGHT);
    }

    // Return user selected theme if exist. Otherwise return the OS theme.
    function getSelectedTheme(): themes {
        const selectedCookie = getUserThemeCookie();
        return selectedCookie ? selectedCookie : getOsTheme();
    }

    function getUserThemeCookie(): themes | undefined {
        const match = document.cookie.match(new RegExp(`(^| )${themeCookieName}=([^;]+)`));
        if (match) return match[2] as themes;
    }

    function setUserThemeCookie(theme: themes): void {
        document.cookie = `${themeCookieName}=${theme}`;
    }

    function getOsTheme(): themes {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.DARK : themes.LIGHT;
    }
}

export default ThemeSwitcher;