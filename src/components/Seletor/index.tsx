
import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

interface DropdownProps {
    options: string[];
    onSelect: (value: string) => void;
}

export const Seletor = (props: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const node = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (node.current?.contains(e.target as Node)) {
            return;
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value: string) => () => {
        setSelectedOption(value);
        setIsOpen(false);
        props.onSelect(value);
    };

    return (
        <div className="dropdown-container" ref={node}>
            <div className="dropdown-header" onClick={toggling}>
                {selectedOption || "0"}
                <div className="dropdown-header-arrow"></div>
            </div>
            {isOpen && (
                <div className="dropdown-list-container">
                    <ul className="dropdown-list">
                        {props.options.map(option => (
                            <li onClick={onOptionClicked(option)} className="dropdown-list-item" key={Math.random()}>
                                {option}    
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}