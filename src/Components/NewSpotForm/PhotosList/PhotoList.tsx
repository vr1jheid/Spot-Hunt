import { CloseButton } from "@mantine/core";

interface Props {
  urlList: { url: string }[];
  deleteItem: (url: string) => void;
}

export const PhotosList = ({ urlList, deleteItem }: Props) => {
  if (!urlList.length) return;
  return (
    <ul className="flex gap-1 pt-4">
      {urlList.map(({ url }) => {
        return (
          <li key={url} className="relative">
            {deleteItem && (
              <CloseButton
                size="xs"
                classNames={{ root: "right-0" }}
                styles={{ root: { position: "absolute" } }}
                onClick={() => {
                  deleteItem(url);
                }}
              />
            )}

            <img className="block w-16 h-16 rounded-md" src={url} />
          </li>
        );
      })}
    </ul>
  );
};
