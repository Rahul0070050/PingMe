const colors = [
  "#1E88E5",
  "#1565C0",
  "#2E7D32",
  "#D84315",
  "#8E24AA",
  "#D81B60",
  "#EF6C00",
  "#3949AB",
];

// Generate a stable color based on the user's name
const getStableColor = (name: string) => {
  if (!name) return "#CCCCCC"; // Default gray for missing names
  const charCodeSum = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

const UserAvatar = ({
  name,
  profileUrl,
}: {
  name: string;
  profileUrl: string;
}) => {
  if (profileUrl) {
    return (
      <img
        src={profileUrl}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
    );
  }

  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
  const bgColor = getStableColor(name);

  return (
    <div
      className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold"
      style={{ backgroundColor: bgColor }}
    >
      {firstLetter}
    </div>
  );
};

export default UserAvatar;
