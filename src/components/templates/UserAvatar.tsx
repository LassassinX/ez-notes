"use client";
import { signOut } from "next-auth/react";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';

const UserAvatar = ({ imageSrc, userName, email }: {
	imageSrc?: string | null;
	userName?: string | null;
	email?: string | null;
}) => {
	return (
		<div className="dropdown dropdown-end">
			<div className="flex gap-2 items-center p-2 rounded-lg border border-secondary" tabIndex={0} role="button">
				<img src={imageSrc || ''} alt="user avatar" className="rounded-full w-10 h-10" />
				<div>
					<h2 className="text-secondary font-bold">
						Hello, {userName}
					</h2>
					<p className="text-xs italic opacity-75">
						{email}
					</p>
				</div>
				<ChevronRightIcon />
			</div>

			<ul tabIndex={0} className="dropdown-content z-[1] menu shadow-lg bg-neutral mt-2 rounded-box font-bold w-max">
				<li>
					<button onClick={() => signOut()} className="p-2 pr-4 whitespace-nowrap">
						<LogoutIcon className="text-primary" />
						Sign out
					</button>
				</li>
			</ul>
		</div>
	);
};

export default UserAvatar;