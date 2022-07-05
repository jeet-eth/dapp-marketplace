import { useState } from "react";

import useIpfs from "../../hooks/useIpfs";

function UploadNFT() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState("");

  const [uiState, setUiState] = useState({
    ipfsLoading: false,
    ipfsMessage: null,
    ipfsError: null,
    mintLoading: false,
    mintError: null,
  });

  const { uploadFile } = useIpfs();

  const captureFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFile(Buffer.from(reader.result as any));
    };
  };

  const mintNFT = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    const metadata = {
      name,
      description,
      image: ipfsUrl,
    };

    console.log(metadata);
  };

  const uploadImgToIPFS = async (e: any) => {
    if (file) {
      setUiState((p) => ({
        ...p,
        ipfsError: null,
        ipfsLoading: true,
      }));
      try {
        const url = await uploadFile(file);
        setIpfsUrl(url);
      } catch (err) {
        setUiState((p) => ({
          ...p,
          ipfsError: `Error uploading file: ${err}`,
        }));
      }

      setUiState((p) => ({
        ...p,
        ipfsError: null,
        ipfsMessage: "File has been uploaded to IPFS",
        ipfsLoading: false,
      }));
    } else {
      setUiState((p) => ({
        ...p,
        ipfsError: "Choose a File to Upload",
      }));
    }
  };

  return (
    <form onSubmit={mintNFT} className="form-control flex flex-col gap-4 w-2/3">
      <div>
        <label className="label">
          <span className="label-text">Enter NFT Name</span>
        </label>
        <label className="input-group">
          <span>&nbsp;&nbsp;Name&nbsp;&nbsp;</span>
          <input
            required
            type="text"
            value={name}
            placeholder="eg. CryptoPunks"
            className="input input-bordered w-full"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Enter NFT Description</span>
        </label>
        <label className="input-group">
          <span>Description</span>
          <input
            required
            type="text"
            value={description}
            placeholder="eg. My First NFT"
            className="input input-bordered w-full"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Upload NFT File</span>
        </label>
        <label className="input-group w-min">
          <span>File</span>
          <input
            disabled={uiState.ipfsLoading}
            type="file"
            className="mr-12"
            onChange={captureFile}
            accept="image/png, image/jpeg"
          />
          {uiState.ipfsLoading ? (
            <button type="button" disabled className="btn normal-case btn-sm loading btn-accent">
              Uploading Image to IPFS
            </button>
          ) : (
            <button type="button" onClick={uploadImgToIPFS} className="btn normal-case btn-sm btn-accent">
              Upload Image to IPFS
            </button>
          )}
        </label>
      </div>
      {uiState.ipfsError && <div className="text-red-500 -mb-5">{uiState.ipfsError}</div>}
      {uiState.ipfsMessage && (
        <div className="flex gap-5 items-center text-green-500 -mb-5">
          <p className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {uiState.ipfsMessage}
          </p>
          {ipfsUrl && (
            <a href={ipfsUrl} target="_blank" className="btn btn-sm normal-case">
              Open File
            </a>
          )}
        </div>
      )}

      <div className="divider">OR</div>

      <div>
        <label className="label">
          <span className="label-text">Enter File URL</span>
        </label>
        <label className="input-group">
          <span>URL</span>
          <input
            required
            type="text"
            placeholder="eg. https://ipfs.infura.io/ipfs/bafybeidz6dftb2jjyfi4sempbuwlbazod56nkvcubth7i5bkpunkayrkt4"
            className="input input-bordered w-full"
            value={ipfsUrl}
            onChange={(e) => setIpfsUrl(e.target.value)}
          />
        </label>
      </div>

      <button type="submit" className="btn btn-wide btn-primary my-12 mx-auto">
        Mint NFT
      </button>
    </form>
  );
}

export default UploadNFT;
