using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace QuizApp
{
    public partial class Form1 : Form
    {
        private List<Question> questions = new List<Question>();
        private int currentQuestionIndex = 0;
        private int score = 0;

        public Form1()
        {
            InitializeComponent();

            // Add some questions to the list.
            questions.Add(new Question("What is the capital of France?", "Paris"));
            questions.Add(new Question("What is the square root of 16?", "4"));
            questions.Add(new Question("What is the chemical symbol for water?", "H2O"));
        }

        private void Button1_Click(object sender, EventArgs e)
        {
            // Get the user's answer.
            string answer = TextBox1.Text;

            // Check the answer.
           if (answer == questions[currentQuestionIndex].QuestionText)
            {
                // Correct answer!
                score++;
                Label2.Text = "Correct!";
            }
            else
            {
                // Incorrect answer!
                Label2.Text = "Incorrect!";
            }

            // Move on to the next question.
            currentQuestionIndex++;

            // If we're at the last question, display the score and prompt for another quiz.
            if (currentQuestionIndex == questions.Count)
            {
                Label3.Text = "Your score is " + score;
                Button1.Text = "Play Again?";
            }
        }

        private void Button2_Click(object sender, EventArgs e)
        {
            // Clear the score and start a new quiz.
            score = 0;
            currentQuestionIndex = 0;
            Label2.Text = "";
            Label3.Text = "";
        }
    }

   public class Question
{
    public string QuestionText { get; set; }
    public string Answer { get; set; }
}
}
