import {profileInfoName, profileInfoVocation, profileAvatar} from './constants'

function addProfileInfo(profile) {
  profileInfoName.textContent = profile.name;
  profileInfoVocation.textContent = profile.about;
  profileAvatar.src = profile.avatar;
  profileAvatar.alt = profile.name + ", " + profile.about;
}

export {addProfileInfo}