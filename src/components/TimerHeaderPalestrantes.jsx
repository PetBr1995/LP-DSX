import { useState, useEffect } from 'react';
import imgFundo from '../assets/vemai-dsx.png';

const TimerHeaderPalestrantes = () => {
    // Mude essa data para a data real do evento DSX 2026
    const targetDate = new Date('2026-01-01T00:00:00');

    const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - new Date().getTime();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num) => num.toString().padStart(2, '0');

    return (
        <section className='px-4 pt-5 bg-black fixed top-0 left-0 right-0 flex justify-center'>
            <a href="/">
                <img src="/DSX-logo-palestrantes.png" alt="logo" />
            </a>
            <div
                className="
             
            z-10 
            w-[700px] 
            m-2 
            rounded-[50px]
            bg-[#111111] 
            text-center
            overflow-hidden
            flex
            justify-center
            items-center
            gap-4
            h-20
            "
            >
                {/* Conteúdo acima do ::before */}
                <div className="relative z-10 flex flex-col items-center gap-2 py-3">
                    <img src={imgFundo} alt="img" className="w-80 translate-x-14" />
                </div>

                {/* Timer */}
                <div className="bg-[url('./fundo-timer.png')] bg-cover bg-center h-full w-[40%] translate-x-[50px] flex items-center justify-center gap-1 px-2">
                    <TimeBlock value={formatNumber(timeLeft.days)} label="Dias" />
                    <Separator />
                    <TimeBlock value={formatNumber(timeLeft.hours)} label="Horas" />
                    <Separator />
                    <TimeBlock value={formatNumber(timeLeft.minutes)} label="Minutos" />
                    <Separator />
                    <TimeBlock value={formatNumber(timeLeft.seconds)} label="Segundos" />
                </div>
            </div>
        </section>
    );
};

// Bloco compacto do número
function TimeBlock({ value, label }) {
    return (
        <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-black font-mono text-white">
                {value}
            </span>
            <span className="text-[8px] font-bold text-white tracking-wider">
                {label}
            </span>
        </div>
    );
}

// Separador compacto
function Separator() {
    return (
        <div className="flex flex-col justify-center mb-4 items-center gap-1.5 h-full">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
    );
}

export default TimerHeaderPalestrantes;