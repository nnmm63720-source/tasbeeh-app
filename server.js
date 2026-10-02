const express =

    require("express");

const path =

    require("path");

const db =

    require("./db");

const app =

    express();

const PORT =

    process.env.PORT || 3000;

// السماح باستقبال JSON

app.use(

    express.json()

);

// تشغيل ملفات HTML/CSS/JS

app.use(

    express.static(

        path.join(

            __dirname,

            "public"

        )

    )

);

// جلب بيانات المستخدم

app.get(

    "/api/progress/:userId",

    (req, res) => {

        const userId =

            req.params.userId;

        db.getProgress(

            userId,

            (err, rows) => {

                if (err) {

                    console.error(err);

                    return res

                        .status(500)

                        .json({

                            error:

                                "Database error"

                        });

                }

                res.json(rows);

            }

        );

    }

);

// حفظ العداد

app.post(

    "/api/progress",

    (req, res) => {

        const {

            userId,

            duaId,

            count

        } = req.body;

        if (

            !userId ||

            !duaId ||

            !Number.isInteger(count) ||

            count < 0 ||

            count > 100

        ) {

            return res

                .status(400)

                .json({

                    error:

                        "Invalid data"

                });

        }

        db.saveProgress(

            userId,

            duaId,

            count,

            (err) => {

                if (err) {

                    console.error(err);

                    return res

                        .status(500)

                        .json({

                            error:

                                "Database error"

                        });

                }

                res.json({

                    success:

                        true

                });

            }

        );

    }

);

// تصفير كل العدادات

app.post(

    "/api/reset",

    (req, res) => {

        const {

            userId

        } = req.body;

        if (!userId) {

            return res

                .status(400)

                .json({

                    error:

                        "Missing userId"

                });

        }

        db.resetProgress(

            userId,

            (err) => {

                if (err) {

                    console.error(err);

                    return res

                        .status(500)

                        .json({

                            error:

                                "Database error"

                        });

                }

                res.json({

                    success:

                        true

                });

            }

        );

    }

);

// فتح الصفحة الرئيسية

app.get(

    "*",

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "public",

                "index.html"

            )

        );

    }

);

// تشغيل السيرفر

app.listen(

    PORT,

    "0.0.0.0",

    () => {

        console.log(

           `Server is running on http://localhost:${PORT}`
        );

    }

);