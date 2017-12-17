module Main exposing (..)

import Html exposing (..)
import Material
import Material.Scheme
import Material.Button as Button
import Material.Textfield as Textfield
import Material.Options as Options exposing (css)
import Material.Color as Color


type alias Model =
    { count : Int
    , mdl :
        Material.Model
    }


model : Model
model =
    { count = 0
    , mdl =
        Material.model
    }


init : ( Model, Cmd Msg )
init =
    ( model, Cmd.none )


type Msg
    = Calculate
    | Mdl (Material.Msg Msg)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Calculate ->
            ( model, Cmd.none )

        Mdl msg_ ->
            Material.update Mdl msg_ model


type alias Mdl =
    Material.Model


view : Model -> Html Msg
view model =
    Material.Scheme.top <|
        Options.div
            [ Options.center ]
            [ Options.styled
                Html.h1
                [ Color.text Color.primary
                , css "margin" "20px"
                ]
                [ text "What's Left?" ]
            , Textfield.render Mdl
                [ 0 ]
                model.mdl
                [ Textfield.label "Date of birth"
                , Textfield.floatingLabel
                , Textfield.text_
                , css "margin" "20px"
                ]
                []
            , Textfield.render Mdl
                [ 1 ]
                model.mdl
                [ Textfield.label "Life Expectancy"
                , Textfield.floatingLabel
                , Textfield.text_
                , css "margin" "20px"
                ]
                []
            , Button.render Mdl
                [ 2 ]
                model.mdl
                [ Button.raised
                , Options.onClick Calculate
                , css "margin" "20px"
                ]
                [ text "Calculate" ]
            ]


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }
