export function convertTime(duration) {
    // Extract hours, minutes, and seconds from the ISO 8601 duration format (e.g., "PT15S", "PT1M", "PT15M16S")
    const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const matches = duration.match(regex);

    if (!matches) {
      return null; // If the format is incorrect, return null
    }

    // Extract hours, minutes, and seconds (if they exist) from the matched groups
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

    // Format time to ensure two digits for minutes and seconds
    const formattedTime = [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");

    return formattedTime;
  }

  export function formatNumber(number) {
    if (number >= 1_000_000_000) {
      return (number / 1_000_000_000).toFixed(1) + "B"; // Billion
    } else if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1) + "M"; // Million
    } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1) + "K"; // Thousand
    } else {
      return number.toString(); // No formatting needed for numbers less than 1000
    }
  }

  export function timeAgo(timestamp) {
    const now = new Date();
    const pastDate = new Date(timestamp);

    const seconds = Math.floor((now - pastDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Approximate month length
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
    if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }
    if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
    if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
    if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }
    return seconds <= 10 ? "Just now" : `${seconds} seconds ago`;
  }