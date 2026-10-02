const sqlite3 =

    require("sqlite3").verbose();

const path =

    require("path");

const dbPath =

    process.env.DB_PATH ||

    path.join(

        __dirname,

        "tasbeeh.db"

    );

const db =

    new sqlite3.Database(

        dbPath

    );

// إنشاء جدول قاعدة البيانات

db.serialize(() => {

    db.run(`

        CREATE TABLE IF NOT EXISTS progress (

            user_id TEXT NOT NULL,

            dua_id INTEGER NOT NULL,

            count INTEGER NOT NULL DEFAULT 0,

            updated_at

            DATETIME

            DEFAULT CURRENT_TIMESTAMP,

            PRIMARY KEY (

                user_id,

                dua_id

            )

        )

    `);

});

// جلب تقدم المستخدم

function getProgress(

    userId,

    callback

) {

    db.all(

        `

        SELECT

            dua_id,

            count

        FROM progress

        WHERE user_id = ?

        `,

        [userId],

        (err, rows) => {

            if (err)

                return callback(err);

            const result = {

                1: 0,

                2: 0,

                3: 0

            };

            rows.forEach(row => {

                result[row.dua_id] =

                    row.count;

            });

            callback(

                null,

                result

            );

        }

    );

}

// حفظ تقدم المستخدم

function saveProgress(

    userId,

    duaId,

    count,

    callback

) {

    db.run(

        `

        INSERT INTO progress

        (

            user_id,

            dua_id,

            count,

            updated_at

        )

        VALUES

        (

            ?,

            ?,

            ?,

            CURRENT_TIMESTAMP

        )

        ON CONFLICT

        (

            user_id,

            dua_id

        )

        DO UPDATE SET

            count =

                excluded.count,

            updated_at =

                CURRENT_TIMESTAMP

        `,

        [

            userId,

            duaId,

            count

        ],

        callback

    );

}

// تصفير العدادات

function resetProgress(

    userId,

    callback

) {

    db.run(

        `

        DELETE FROM progress

        WHERE user_id = ?

        `,

        [userId],

        callback

    );

}

module.exports = {

    getProgress,

    saveProgress,

    resetProgress

};