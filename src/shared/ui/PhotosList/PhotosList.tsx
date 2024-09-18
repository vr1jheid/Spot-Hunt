import { CloseButton } from "@mantine/core";

interface Props {
  items: string[];
  onDelete?: (url?: string) => void;
}

export const PhotosList = ({ items, onDelete }: Props) => {
  if (!items.length) return;
  return (
    <ul className="flex gap-1 pt-4">
      {items.map((url) => {
        return (
          <li key={url} className="relative">
            {onDelete && (
              <CloseButton
                size="xs"
                classNames={{ root: "right-[1px] top-[1px] opacity-70" }}
                styles={{
                  root: { position: "absolute", backgroundColor: "white" },
                }}
                onClick={() => {
                  onDelete(url);
                }}
              />
            )}

            <img className="block h-16 w-16 rounded-md" src={url} />
          </li>
        );
      })}
    </ul>
  );
};
