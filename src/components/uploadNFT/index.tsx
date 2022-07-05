import { useState } from "react";

function UploadNFT() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);

  const captureFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);
  };

  const uploadNFT = (e: any) => {
    console.log(e);
  };
  const uploadFile = (e: any) => {
    console.log(e);
  };

  return (
    <div className="form-control flex flex-col gap-4 w-2/3">
      <div>
        <label className="label">
          <span className="label-text">Enter NFT Name</span>
        </label>
        <label className="input-group">
          <span>&nbsp;&nbsp;Name&nbsp;&nbsp;</span>
          <input
            required
            type="text"
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
        <label className="input-group w-min ">
          <span>File</span>
          <input type="file" className="mr-12" onChange={captureFile} accept="image/png, image/jpeg" />
          <button onClick={uploadFile} className="btn normal-case btn-sm btn-accent">
            Upload NFT to IPFS
          </button>
        </label>
      </div>

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
            placeholder="eg. ipfs://bafybeidz6dftb2jjyfi4sempbuwlbazod56nkvcubth7i5bkpunkayrkt4"
            className="input input-bordered w-full"
            onChange={(e) => setIpfsHash(e.target.value)}
          />
        </label>
      </div>

      <button onClick={uploadNFT} className="btn btn-wide btn-primary my-12 mx-auto">
        Upload NFT
      </button>
    </div>
  );
}

export default UploadNFT;
