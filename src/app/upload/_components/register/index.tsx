import { FC, useState } from "react";

import { Button, Input, Modal, Select } from "@common";
import { User, Collaborators } from "@svg";
import { Upload } from "../../app/styles";

interface Props {
  open: boolean;
  setClose: (a: boolean) => void;
};

export const Register: FC<Props> = ({ open, setClose }) => {
  const [creator, setCreator] = useState('');

  const addNewCreator = (evt) => {
    // api.creator.create({
    //   name: creator,
    //   description: 'testing',
    //   photo: '',
    //   social_media: '',
    // })
  };

  return (
    <Modal open={open} onClickOutside={setClose}>
      <Upload>
        <label htmlFor="file">
          {false ? <img src={''} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} /> : 'Choose a file'}
        </label>
        <input
          style={{
            // cursor: isSubmitting ? 'default' : 'pointer'
          }}
          // value={value}
          type="file"
          name="file"
          id="file"
          accept="video/mp4, video/webp"
          // disabled={isSubmitting}
          onChange={evt => {
            const reader = new FileReader();

            reader.readAsDataURL(evt.target.files![0]);
            // reader.onloadend = () => onChange(reader.result as string);
          }}
        />
      </Upload>
      <Input icon={User} placeholder="new creator" onChange={evt => setCreator(evt.target.value)} />
      <div style={{ height: 20 }} />
      <Select icon={Collaborators} width="medium" value={''} placeholder="collaborators (optional)" select={[]} onChange={() => { }} />
      <div style={{ height: 20 }} />
      <Button onClick={addNewCreator}>Register</Button>
    </Modal>
  )
};