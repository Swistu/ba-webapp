import {useState} from 'react';

type Props = {};

const UserDropdown: React.FC<Props> = () => {

    const [dropdownOpen, setdropdownOpen] = useState(false);

    return <>

        <div
            onClick={() => setdropdownOpen(!dropdownOpen)}
            className="overflow-hidden rounded-full w-8 h-8 flex justify-center items-center
                            hover:cursor-pointer bg-[rgba(3,3,3,0.3)] p-5 hover:bg-[rgba(3,3,3,0.6)] hover:transition-all
                            ">

            Toggle
        </div>


        <div
            className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute right-[.5rem] z-40 mt-2 w-[250px] rounded border-[.5px] border-light bg-primary py-5 shadow-card transition-all bg-secondary`}>
            <a
                href=""
                className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-gb-to-to"
            >
                Dashboard
            </a>
            <a
                href=""
                className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-gb-to-to"
            >
                Settings
            </a>
            <a
                href=""
                className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-gb-to-to"
            >
                Earnings
            </a>
            <a
                href=""
                className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-gb-to-to"
            >
                Logout
            </a>
        </div>

    </>;
};

export default UserDropdown;
