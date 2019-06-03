import Note from "../models/Note";
import User from "../models/User";

export default async () => {

    User.bulkCreate([{
        email: "00@ad.ad",
        name: "Name",
        passwordHash: "pwd"
    }, {
        email: "11@ad.ad",
        name: "Name 2",
        passwordHash: "1234"
    }], {
        individualHooks: true
    }).then(() => {
        Note.bulkCreate([{
            userEmail: "00@ad.ad",
            title: "Note 1",
            content: "asdsadsadsad asfdfsd dsf"
        }, {
            userEmail: "00@ad.ad",
            title: "Note 2",
            content: "asdsadsadsad asfdfsd dsfasdasdasd"
        }, {
            userEmail: "00@ad.ad",
            title: "Note 3",
            content: "asdsadsadsad asfdfsd dsfasdasdasd"
        }, {
            userEmail: "11@ad.ad",
            title: "Note 1",
            content: "asdsadsadsad"
        }, {
            userEmail: "11@ad.ad",
            title: "Note 2",
            content: "asdsadsadsad a11123"
        }], {
            individualHooks: true
        });
    });
};
