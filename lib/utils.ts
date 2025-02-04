import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date: number) {
  const now = new Date().getTime();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    if (diffInSeconds === 1) {
      return `A second ago`;
    }
    return `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    if (diffInMinutes === 1) {
      return `A minute ago`;
    }
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    if (diffInHours === 1) {
      return `An hour ago`;
    }
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 7) {
    if (diffInDays === 1) {
      return `Yesterday`;
    }
    return `${diffInDays} days ago`;
  } else if (diffInWeeks < 4) {
    if (diffInWeeks === 1) {
      return `A week ago`;
    }
    return `${diffInWeeks} weeks ago`;
  } else if (diffInMonths < 12) {
    if (diffInMonths === 1) {
      return `A month ago`;
    }
    return `${diffInMonths} months ago`;
  } else {
    if (diffInYears === 1) {
      return `A year ago`;
    }
    return `${diffInYears} years ago`;
  }
}
